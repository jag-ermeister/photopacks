import boto3
import os
import uuid
from django.conf import settings


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

    def upload_to_s3(self, file_obj):
        # Create a unique object name based on the file's original name and a UUID
        extension = file_obj.name.split('.')[-1]
        object_name = f"{uuid.uuid4()}.{extension}"

        # Upload the file
        self.s3_client.upload_fileobj(
            file_obj,
            os.environ['ORDER_IMAGES_S3_BUCKET_NAME'],
            object_name,
            ExtraArgs={'ContentType': file_obj.content_type}
        )

        # Return the URL of the uploaded file
        return f"https://{bucket_name}.s3.{settings.AWS_S3_REGION_NAME}.amazonaws.com/{object_name}"

    def submit_job_to_match(self, order_id):
        _ = self.batch_client.submit_job(
            jobName=f"generation_{order_id}",
            jobQueue=(
                f"arn:aws:batch:us-east-1:302468449804:job-queue/"
                f'{os.environ["GENERATION_BATCH_JOB_QUEUE_NAME"]}'
            ),
            jobDefinition=os.environ["TRAINING_BATCH_JOB_DEFN_NAME"],
            containerOverrides={
                "command": [
                    "./training-script.sh",
                    f"{order_id}",
                ]
            },
        )