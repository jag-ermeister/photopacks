from django.urls import path
from . import views

urlpatterns = [
    path(
        "orders/<uuid:order_id>",
        views.update_order,
        name="update_order",
    ),
    path(
        "orders/<uuid:order_id>/runpod",
        views.runpod_webhook,
        name="runpod_webhook",
    ),
    path("queue/process",
         views.submit_orders_for_processing,
         name="submit_orders_for_processing"
    )
]
