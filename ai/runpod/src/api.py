import requests
import json


def notify_backend(
        order_id,
        pack_1_inference_image_urls,
        pack_2_inference_image_urls,
        pack_3_inference_image_urls,
        pack_4_inference_image_urls,
        pack_5_inference_image_urls,
        cropped_image_urls,
        zip_url,
        results_url,
        prompts
):
    request = {
        "order_id": order_id,
        "pack_1_inference_image_urls": pack_1_inference_image_urls,
        "pack_2_inference_image_urls": pack_2_inference_image_urls,
        "pack_3_inference_image_urls": pack_3_inference_image_urls,
        "pack_4_inference_image_urls": pack_4_inference_image_urls,
        "pack_5_inference_image_urls": pack_5_inference_image_urls,
        "cropped_image_urls": cropped_image_urls,
        "zip_url": zip_url,
        "prompts": prompts
    }

    print("Sending inference results to API...")
    print(request)
    print(results_url)

    response = requests.post(results_url, data=json.dumps(request))
    response.raise_for_status()
