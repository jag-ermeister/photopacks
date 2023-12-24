import requests
import json


def notify_backend(order_id, inference_image_urls, cropped_image_urls, zip_url, results_url, prompts):
    request = {
        "order_id": order_id,
        "image_urls": inference_image_urls,
        "cropped_image_urls": cropped_image_urls,
        "zip_url": zip_url,
        "prompts": prompts
    }

    print("Sending inference results to API...")
    print(request)
    print(results_url)

    response = requests.post(results_url, data=json.dumps(request))
    response.raise_for_status()
