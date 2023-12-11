import uuid
from enum import Enum
from django.db import models
from django.contrib.auth.models import User


class Order(models.Model):
    class FulfillmentService(Enum):
        RUNPOD = "runpod"
        BATCH = "batch"

        def __str__(self):
            return self.value

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subject_name = models.CharField(max_length=240)
    fulfillment_service = models.CharField(
        max_length=20,
        choices=[(item.value, item.name) for item in FulfillmentService],
        default=FulfillmentService.RUNPOD.value
    )
    is_processing = models.BooleanField(default=False)
    is_success = models.BooleanField(null=True)
    error_message = models.CharField(max_length=320, null=True, blank=True)
    training_image_urls = models.JSONField(blank=True, null=True)
    inference_image_urls = models.JSONField(blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
