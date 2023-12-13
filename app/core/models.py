import uuid
from enum import Enum
from django.db import models
from django.contrib.auth.models import User


class PromptPack(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=240, unique=True)
    prompts = models.JSONField()
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    class FulfillmentService(Enum):
        RUNPOD = "runpod"
        BATCH = "batch"

        def __str__(self):
            return self.value

    class ModelType(Enum):
        MAN = "man"
        WOMAN = "woman"
        DOG = "dog"
        CAT = "cat"

        def __str__(self):
            return self.value

    class SpeedType(Enum):
        TEST = 100
        FAST = 4160
        MODERATE = 6240
        SLOW = 8320

        @classmethod
        def choices(cls):
            return [(item.value, f"{item.name.lower()} ({item.value})") for item in cls]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subject_name = models.CharField(max_length=240)
    prompt_pack = models.ForeignKey(PromptPack, on_delete=models.PROTECT, related_name="orders")
    model_type = models.CharField(
        max_length=20,
        choices=[(item.value, item.name) for item in ModelType],
        default=ModelType.MAN.value
    )
    speed_type = models.IntegerField(
        choices=SpeedType.choices(),
        default=SpeedType.FAST.value
    )
    fulfillment_service = models.CharField(
        max_length=20,
        choices=[(item.value, item.name) for item in FulfillmentService],
        default=FulfillmentService.RUNPOD.value
    )
    is_processing = models.BooleanField(default=False)
    is_success = models.BooleanField(null=True)
    error_message = models.TextField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
    training_image_urls = models.JSONField(blank=True, null=True)
    inference_image_urls = models.JSONField(blank=True, null=True)
    zip_file_url = models.URLField(null=True, blank=True)
    runpod_webhook_time = models.DateTimeField(null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
