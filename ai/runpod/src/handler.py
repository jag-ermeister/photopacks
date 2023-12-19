import runpod
from gpu_info import print_gpu_memory
from file_utils import create_required_folders, move_image_files
from kohya import Kohya
from s3 import upload_images_to_s3, download_training_photos, upload_zip_to_s3
from api import notify_backend
from cropper import Cropper


def handler(job):
    job_input = job['input']
    order_id = job_input.get('order_id')
    results_url = job_input.get('results_url')
    order_images_s3_bucket_name = job_input.get('order_images_s3_bucket_name')
    model_type = job_input.get('model_type')
    num_steps = job_input.get('num_steps')
    prompts = job_input.get('prompts')
    images_per_prompt = job_input.get('images_per_prompt')

    print('Received payload:')
    print(job_input)

    print_gpu_memory()
    training_download_directory = '/app/downloaded_training_images'
    training_dir = create_required_folders(model_type, training_download_directory)
    download_training_photos(order_id, training_download_directory, order_images_s3_bucket_name)
    Cropper().auto_zoom(training_download_directory, training_dir, model_type)
    move_image_files(model_type)

    kohya = Kohya()
    kohya.enable_accelerator()
    kohya.execute_training(num_steps)
    kohya.execute_inference(model_type, prompts, images_per_prompt)

    inference_image_urls = upload_images_to_s3(
        order_id,
        '/app/kohya_ss/inference_results',
        'inference_results',
        order_images_s3_bucket_name
    )
    cropped_image_urls = upload_images_to_s3(
        order_id,
        training_dir,
        'cropped_results',
        order_images_s3_bucket_name
    )
    zip_url = upload_zip_to_s3(order_id, order_images_s3_bucket_name)
    notify_backend(order_id, inference_image_urls, cropped_image_urls, zip_url, results_url)

    return f"Hello, {order_id}, you rock!"


runpod.serverless.start({"handler": handler})
