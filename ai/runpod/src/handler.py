import runpod
from gpu_info import print_gpu_memory
from file_utils import create_required_folders, move_image_files
from kohya import Kohya
from s3 import upload_images_to_s3, download_training_photos
from api import notify_backend


def handler(job):
    """ Handler function that will be used to process jobs. """
    job_input = job['input']
    order_id = job_input.get('order_id')
    results_url = job_input.get('results_url')
    model_type = job_input.get('model_type')
    num_steps = job_input.get('num_steps')
    prompts = job_input.get('prompts')

    print('Received payload:')
    print(job_input)

    print_gpu_memory()
    training_dir = create_required_folders(model_type)
    download_training_photos(order_id, training_dir)
    move_image_files(model_type)

    kohya = Kohya()
    kohya.enable_accelerator()
    kohya.execute_training(num_steps)
    kohya.execute_inference(model_type, prompts)

    image_urls = upload_images_to_s3(order_id)
    notify_backend(order_id, image_urls, results_url)

    return f"Hello, {order_id}, you rock!"


runpod.serverless.start({"handler": handler})