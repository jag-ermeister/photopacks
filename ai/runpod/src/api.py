import requests


def notify_backend(order_id, image_urls, results_url):
    request = {
        "order_id": order_id,
        "image_urls": image_urls,
    }

    print("Sending inference results to API...")
    print(request)
    print(results_url)

    response = requests.post(results_url, data=json.dumps(request))
    response.raise_for_status()
