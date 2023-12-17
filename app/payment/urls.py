from django.urls import path
from payment.views import (
    create_checkout_session,
    stripe_webhook,
)

urlpatterns = [
    path("checkout", create_checkout_session, name="create_checkout_session"),
    path("stripe/webhook", stripe_webhook, name="stripe_webhook"),
]