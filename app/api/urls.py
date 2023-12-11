from django.urls import path
from . import views

urlpatterns = [
    path(
        "orders/<uuid:order_id>",
        views.update_order,
        name="update_order",
    ),
]
