import os
import uuid
import boto3
from PIL import Image
from io import BytesIO
from zipfile import ZipFile


def upload_images_to_s3(order_id, images_to_upload_directory, bucket_directory, order_images_s3_bucket_name):
    print("Uploading images...")

    s3 = boto3.client(
        "s3",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )

    image_urls = []
    if os.path.exists(images_to_upload_directory):
        print(f"{images_to_upload_directory} exists. Uploading images from this directory...")
        for file_name in os.listdir(images_to_upload_directory):
            if file_name.lower().endswith(('.png', '.jpg', '.jpeg')):
                image_path = os.path.join(images_to_upload_directory, file_name)
                with Image.open(image_path) as image:
                    buffer = BytesIO()
                    image.save(buffer, "jpeg")
                    buffer.seek(0)
                    unique_file_name = f"{str(uuid.uuid4())}.jpg"
                    key = f"{order_id}/{bucket_directory}/{unique_file_name}"
                    s3.put_object(Body=buffer, Bucket=order_images_s3_bucket_name, Key=key)
                    image_url = (
                        f"https://{order_images_s3_bucket_name}.s3.{os.environ['AWS_S3_REGION_NAME']}.amazonaws.com/{key}"
                    )
                    image_urls.append(image_url)
    else:
        print(f"{images_to_upload_directory} does not exist. Skipping uploading images from this directory.")
    return image_urls


def upload_zip_to_s3(order_id, order_images_s3_bucket_name, inference_results_path):
    print("Zipping and uploading images...")

    s3 = boto3.client(
        "s3",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )

    zip_file_path = f"/tmp/{order_id}.zip"

    with ZipFile(zip_file_path, 'w') as zipf:
        for file_name in os.listdir(inference_results_path):
            if file_name.lower().endswith(('.png', '.jpg', '.jpeg')):
                image_path = os.path.join(inference_results_path, file_name)
                zipf.write(image_path, os.path.basename(image_path))

    key = f"{order_id}/inference_results_zip/{order_id}.zip"
    with open(zip_file_path, 'rb') as file_data:
        s3.put_object(
            Body=file_data,
            Bucket=order_images_s3_bucket_name,
            Key=key
        )

    zip_url = f"https://{order_images_s3_bucket_name}.s3.{os.environ['AWS_S3_REGION_NAME']}.amazonaws.com/{key}"

    return zip_url


def download_training_photos(order_id, training_image_directory, order_images_s3_bucket_name):
    print("Downloading training images...")

    s3 = boto3.client(
        "s3",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )

    bucket_name = order_images_s3_bucket_name
    folder_name = f"{order_id}/training_photos"

    print(f"Downloading training images from {bucket_name}")

    for obj in s3.list_objects(Bucket=bucket_name, Prefix=folder_name)["Contents"]:
        file_name = obj["Key"].split("/")[-1]
        print(f"Downloading file {file_name}")
        local_file_path = os.path.join(training_image_directory, file_name)
        s3.download_file(bucket_name, obj["Key"], local_file_path)
