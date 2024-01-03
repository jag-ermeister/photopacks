import boto3
import os
import uuid
import json
import requests
import logging
from django.template.loader import render_to_string
from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from .models import Order

logger = logging.getLogger(__name__)


class AiService:
    def __init__(self):
        self.s3_client = boto3.client(
            's3',
            aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
            region_name=os.environ['AWS_S3_REGION_NAME']
        )
        self.batch_client = boto3.client("batch", region_name="us-east-1")
        self.sqs_client = boto3.client("sqs", region_name="us-east-1")

    def upload_to_s3(self, file_obj, order_id):
        # Create a unique object name based on the file's original name and a UUID
        extension = file_obj.name.split('.')[-1]
        object_name = f"{order_id}/training_photos/{uuid.uuid4()}.{extension}"

        bucket_name = os.environ['ORDER_IMAGES_S3_BUCKET_NAME']

        # Upload the file
        self.s3_client.upload_fileobj(
            file_obj,
            bucket_name,
            object_name,
            ExtraArgs={'ContentType': file_obj.content_type}
        )

        return f"https://{bucket_name}.s3.{os.environ['AWS_S3_REGION_NAME']}.amazonaws.com/{object_name}"

    def submit_job(self, order):
        if order.fulfillment_service == Order.FulfillmentService.RUNPOD.value:
            self._submit_job_to_runpod(order)
        elif order.fulfillment_service == Order.FulfillmentService.BATCH.value:
            self._submit_job_to_batch(order)

    def _submit_job_to_batch(self, order):
        _ = self.batch_client.submit_job(
            jobName=f"generation_{order.id}",
            jobQueue=(
                f"arn:aws:batch:us-east-1:302468449804:job-queue/"
                f'{os.environ["SDXL_BATCH_JOB_QUEUE_NAME"]}'
            ),
            jobDefinition=os.environ["SDXL_BATCH_JOB_DEFN_NAME"],
            containerOverrides={
                "command": [
                    "./generate.sh",
                    f"{order.id}",
                ]
            },
        )

    def _submit_job_to_runpod(self, order):
        prompts = []
        for i in range(1, 6):
            prompt_pack = getattr(order, f'prompt_pack_{i}')
            if prompt_pack:
                prompts.extend(prompt_pack.prompts)

        response = requests.post(
            os.environ["RUNPOD_JOB_SUBMIT_URL"],
            json={
                "input": {
                    "order_id": str(order.id),
                    "results_url": f'{os.environ["API_URL"]}/api/orders/{str(order.id)}',
                    "order_images_s3_bucket_name": os.environ["ORDER_IMAGES_S3_BUCKET_NAME"],
                    "model_type": order.model_type,
                    "num_steps": order.speed_type,
                    "prompts": prompts,
                    "images_per_prompt": order.images_per_prompt,
                },
                "webhook": f'{os.environ["API_URL"]}/api/orders/{str(order.id)}/runpod'
            },
            headers={
                'Authorization': f'Bearer {os.environ["RUNPOD_API_KEY"]}'
            }
        )
        response.raise_for_status()

        order.is_submitted = True
        order.save()


class EmailService:
    def __init__(self):
        self.sg = SendGridAPIClient(os.environ['SENDGRID_API_KEY'])

    def send_welcome_email(self, user):
        try:
            message = Mail(
                from_email='info@photopacks.ai',
                to_emails=user.email,
                subject='Thank you for signing up for PhotoPacks.AI',
                html_content = render_to_string('email/welcome.html', {
                    'site_url': os.environ['SITE_URL']
                }),
            )
            response = self.sg.send(message)
            print(response.status_code)
        except Exception as e:
            print(e.message)
            raise e

    def send_order_confirmation_email(self, order):
        try:
            message = Mail(
                from_email='info@photopacks.ai',
                to_emails=order.user.email,
                subject='PhotoPacks.AI Order Confirmation',
                html_content=render_to_string('email/order_confirmation.html', {
                    'order': order,
                    'site_url': os.environ['SITE_URL']
                })
            )
            response = self.sg.send(message)
            print(response.status_code)
        except Exception as e:
            print(e.message)
            raise e

    def send_order_complete_email(self, order):
        try:
            message = Mail(
                from_email='info@photopacks.ai',
                to_emails=order.user.email,
                subject='Your PhotoPacks.AI order is complete',
                html_content=render_to_string('email/order_complete.html', {
                    'order': order,
                    'site_url': os.environ['SITE_URL']
                })
            )
            response = self.sg.send(message)
            print(response.status_code)
        except Exception as e:
            print(e.message)
            raise e
