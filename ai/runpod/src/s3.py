import os
import uuid
import boto3
from PIL import Image
from io import BytesIO


def upload_images_to_s3(order_id):
    print("Uploading images...")

    s3 = boto3.client(
        "s3",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )

    inference_results_path = "/app/kohya_ss/inference_results"
    image_urls = []
    for file_name in os.listdir(inference_results_path):
        if file_name.lower().endswith(('.png', '.jpg', '.jpeg')):
            image_path = os.path.join(inference_results_path, file_name)
            with Image.open(image_path) as image:
                buffer = BytesIO()
                image.save(buffer, "jpeg")
                buffer.seek(0)
                unique_file_name = f"{str(uuid.uuid4())}.jpg"
                key = f"{order_id}/inference_results/{unique_file_name}"
                s3.put_object(Body=buffer, Bucket=os.environ['ORDER_IMAGES_S3_BUCKET_NAME'], Key=key)
                image_url = (
                    f"https://{os.environ['ORDER_IMAGES_S3_BUCKET_NAME']}.s3.{os.environ['AWS_S3_REGION_NAME']}.amazonaws.com/{key}"
                )
                image_urls.append(image_url)
    return image_urls


def download_training_photos(order_id, training_image_directory):
    print("Downloading training images...")

    s3 = boto3.client(
        "s3",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )

    bucket_name = os.environ['ORDER_IMAGES_S3_BUCKET_NAME']
    folder_name = f"{order_id}/training_photos"

    print(f"Downloading training images from {bucket_name}")

    for obj in s3.list_objects(Bucket=bucket_name, Prefix=folder_name)["Contents"]:
        file_name = obj["Key"].split("/")[-1]
        print(f"Downloading file {file_name}")
        local_file_path = os.path.join(training_image_directory, file_name)
        s3.download_file(bucket_name, obj["Key"], local_file_path)
