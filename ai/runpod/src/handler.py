import runpod
from gpu_info import print_gpu_memory
from file_utils import create_required_folders, move_image_files
from kohya import Kohya
from s3 import upload_images_to_s3, download_training_photos, upload_zip_to_s3
from api import notify_backend
from cropper import Cropper
from modify_prompts import modify_prompts
from captions.captions import get_adjective


def handler(job):
    job_input = job['input']
    order_id = job_input.get('order_id')
    results_url = job_input.get('results_url')
    order_images_s3_bucket_name = job_input.get('order_images_s3_bucket_name')
    model_type = job_input.get('model_type')
    num_steps = job_input.get('num_steps')
    pack_1_prompts = job_input.get('pack_1_prompts')
    pack_2_prompts = job_input.get('pack_2_prompts')
    pack_3_prompts = job_input.get('pack_3_prompts')
    pack_4_prompts = job_input.get('pack_4_prompts')
    pack_5_prompts = job_input.get('pack_5_prompts')
    images_per_prompt = job_input.get('images_per_prompt')

    print('Received payload:')
    print(job_input)

    print_gpu_memory()

    training_download_directory = '/app/downloaded_training_images'
    training_dir = create_required_folders(model_type, training_download_directory)
    download_training_photos(order_id, training_download_directory, order_images_s3_bucket_name)
    Cropper().auto_zoom(training_download_directory, training_dir, model_type)
    move_image_files(model_type)

    color = get_adjective(training_dir, model_type)
    pack_1_prompts = modify_prompts(pack_1_prompts, color, model_type)
    pack_2_prompts = modify_prompts(pack_2_prompts, color, model_type)
    pack_3_prompts = modify_prompts(pack_3_prompts, color, model_type)
    pack_4_prompts = modify_prompts(pack_4_prompts, color, model_type)
    pack_5_prompts = modify_prompts(pack_5_prompts, color, model_type)

    kohya = Kohya()
    kohya.enable_accelerator()
    kohya.execute_training(num_steps)

    kohya.execute_inference(pack_1_prompts, images_per_prompt, '/app/kohya_ss/inference_results/1')
    kohya.execute_inference(pack_2_prompts, images_per_prompt, '/app/kohya_ss/inference_results/2')
    kohya.execute_inference(pack_3_prompts, images_per_prompt, '/app/kohya_ss/inference_results/3')
    kohya.execute_inference(pack_4_prompts, images_per_prompt, '/app/kohya_ss/inference_results/4')
    kohya.execute_inference(pack_5_prompts, images_per_prompt, '/app/kohya_ss/inference_results/5')

    pack_1_inference_image_urls = upload_images_to_s3(
        order_id,
        '/app/kohya_ss/inference_results/1',
        'inference_results',
        order_images_s3_bucket_name
    )
    pack_2_inference_image_urls = upload_images_to_s3(
        order_id,
        '/app/kohya_ss/inference_results/2',
        'inference_results',
        order_images_s3_bucket_name
    )
    pack_3_inference_image_urls = upload_images_to_s3(
        order_id,
        '/app/kohya_ss/inference_results/3',
        'inference_results',
        order_images_s3_bucket_name
    )
    pack_4_inference_image_urls = upload_images_to_s3(
        order_id,
        '/app/kohya_ss/inference_results/4',
        'inference_results',
        order_images_s3_bucket_name
    )
    pack_5_inference_image_urls = upload_images_to_s3(
        order_id,
        '/app/kohya_ss/inference_results/5',
        'inference_results',
        order_images_s3_bucket_name
    )

    cropped_image_urls = upload_images_to_s3(
        order_id,
        training_dir,
        'cropped_results',
        order_images_s3_bucket_name
    )
    pack_1_zip_url = upload_zip_to_s3(order_id, order_images_s3_bucket_name, '/app/kohya_ss/inference_results/1', 1)
    pack_2_zip_url = upload_zip_to_s3(order_id, order_images_s3_bucket_name, '/app/kohya_ss/inference_results/2', 2)
    pack_3_zip_url = upload_zip_to_s3(order_id, order_images_s3_bucket_name, '/app/kohya_ss/inference_results/3', 3)
    pack_4_zip_url = upload_zip_to_s3(order_id, order_images_s3_bucket_name, '/app/kohya_ss/inference_results/4', 4)
    pack_5_zip_url = upload_zip_to_s3(order_id, order_images_s3_bucket_name, '/app/kohya_ss/inference_results/5', 5)
    notify_backend(
        order_id,
        pack_1_inference_image_urls,
        pack_2_inference_image_urls,
        pack_3_inference_image_urls,
        pack_4_inference_image_urls,
        pack_5_inference_image_urls,
        cropped_image_urls,
        pack_1_zip_url,
        pack_2_zip_url,
        pack_3_zip_url,
        pack_4_zip_url,
        pack_5_zip_url,
        results_url,
        pack_1_prompts + pack_2_prompts + pack_3_prompts + pack_4_prompts + pack_5_prompts
    )

    return f"Hello, {order_id}, you rock!"


runpod.serverless.start({"handler": handler})
