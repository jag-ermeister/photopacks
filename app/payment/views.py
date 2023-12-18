from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import serializers, status
from django.http import JsonResponse
import stripe
import os
import logging
import json

logger = logging.getLogger(__name__)


@api_view(["POST"])
@permission_classes([AllowAny])
def stripe_webhook(request):
    logger.error("Stripe webhook endpoint accessed.")

    webhook_secret = os.environ["STRIPE_WEBHOOK_SECRET"]
    signature = request.headers.get("stripe-signature")

    event = stripe.Webhook.construct_event(
        payload=request.body, sig_header=signature, secret=webhook_secret
    )
    data = event["data"]
    event_type = event["type"]
    logger.error("Stripe: received event type {}".format(event_type))

    if event_type == "payment_intent.succeeded":
        # Should I use this event? "checkout.session.completed":
        print(data)
    else:
        print("Unhandled event type {}".format(event_type))
        logger.error("Unhandled event type {}".format(event_type))

    return JsonResponse({"status": "success"})


@api_view(["POST"])
def create_checkout_session(request):
    try:
        data = json.loads(request.body)

        order_id = data.get("order_id", None)
        if not order_id:
            return Response({"message": "order_id not provided"}, status=400)

        stripe.api_key = os.environ["STRIPE_SECRET_API_KEY"]
        checkout_session = stripe.checkout.Session.create(
            line_items=[
                {
                    "price": os.environ["STRIPE_PHOTO_PACK_PRICE_ID"],
                    "quantity": 1,
                },
            ],
            mode="payment",
            success_url=f"{os.environ['SITE_URL']}/upload/{order_id}?success=true",
            cancel_url=f"{os.environ['SITE_URL']}/upload/{order_id}?canceled=true",
            automatic_tax={"enabled": True},  # TODO: do I actually want this?
            metadata={
                "user_id": request.user.id,
                "order_id": order_id,
            },
        )
    except Exception as e:
        return Response(str(e), status=500)

    return JsonResponse({"redirect_url": checkout_session.url})