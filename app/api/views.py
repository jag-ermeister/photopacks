from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from core.models import Order
import json


@csrf_exempt
def update_order(request, order_id):
    # TODO: I should update this to only accept a PUT request
    print("update_order request received!")
    request_body = json.loads(request.body.decode("utf-8"))
    print(request_body)

    order = Order.objects.get(id=order_id)
    order.inference_image_urls = request_body["image_urls"]
    order.is_success = True
    order.save()

    return HttpResponse()
