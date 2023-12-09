import uuid
from django.db import models
from django.contrib.auth.models import User


class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subject_name = models.CharField(max_length=240)
    is_processing = models.BooleanField(default=False)
    is_success = models.BooleanField(null=True)
    error_message = models.CharField(max_length=320, null=True, blank=True)
    training_image_urls = models.JSONField(blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
