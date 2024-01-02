from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
from django.utils import timezone
from core.models import Order
from core.services import AiService, EmailService
import json


@csrf_exempt
def update_order(request, order_id):
    # TODO: I should update this to only accept a PUT request
    print("update_order request received!")
    request_body = json.loads(request.body.decode("utf-8"))
    print(request_body)

    order = Order.objects.get(id=order_id)
    order.inference_image_urls = request_body["image_urls"]
    order.cropped_image_urls = request_body["cropped_image_urls"]
    order.zip_file_url = request_body["zip_url"]
    order.is_success = True
    order.save()

    EmailService().send_order_complete_email(order)

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
        order.error_message = "Cancelled"
        order.save()

    return HttpResponse()


@csrf_exempt
def submit_orders_for_processing(request):
    orders_ready_for_submission = Order.objects.filter(
        training_image_urls__isnull=False,
        is_submitted=False,
        is_paid=True
    ).order_by('created_date')
    num_ready_for_submission = orders_ready_for_submission.count()
    print(f"Found {num_ready_for_submission} orders ready for processing.")

    processing_orders_count = Order.objects.filter(
        Q(error_message__exact='') | Q(error_message__isnull=True),
        is_submitted=True,
    ).count()
    print(f"Found {processing_orders_count} already processing processing.")

    MAX_ORDERS_PROCESSING = 2
    available_slots = MAX_ORDERS_PROCESSING - processing_orders_count

    submitted_orders = []
    if available_slots > 0:
        for order in orders_ready_for_submission[:available_slots]:
            AiService().submit_job(order)
            submitted_orders.append(order.id)
            print(f"Submitted order {order.id} for processing.")

    print(f"Submitted a total of {len(submitted_orders)} for processing.")

    return JsonResponse({
        'num_already_processing': processing_orders_count,
        'num_orders_ready_for_submission': num_ready_for_submission,
        'submitted_orders': submitted_orders,
    })