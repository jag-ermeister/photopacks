from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
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

@csrf_exempt
def runpod_webhook(request, order_id):
    print("runpod_webhook request received!")
    request_body = json.loads(request.body.decode("utf-8"))
    print(request_body)

    order = Order.objects.get(id=order_id)

    status = request_body['status']
    if status == 'COMPLETED':
        # is_success should have already been saved in update_order function
        order.runpod_webhook_time = timezone.now()
        order.save()
    elif status == 'FAILED':
        order.runpod_webhook_time = timezone.now()
        order.error_message = request_body['error']
        order.is_success = False
        order.save()
    else:
        # I think this might happen on a cancellation
        order.is_success = False
        order.save()

    return HttpResponse()

