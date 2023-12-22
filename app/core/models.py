import uuid
from enum import Enum
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import UserManager as _UserManager


class UserManager(_UserManager):
    def get_or_create_for_cognito(self, payload):
        cognito_id = payload["sub"]

        try:
            return self.get(cognito_id=cognito_id)
        except self.model.DoesNotExist:
            pass

        try:
            user = self.create(
                username=payload["email"],
                cognito_id=cognito_id,
                email=payload["email"],
                is_active=True,
            )
        except IntegrityError:
            user = self.get(cognito_id=cognito_id)

        return user


class User(AbstractUser):
    cognito_id = models.CharField(max_length=128, unique=True, blank=True)
    email = models.TextField(max_length=20, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    objects = UserManager()


class PromptPack(models.Model):
    class PackType(Enum):
        MAN = "Man"
        WOMAN = "Woman"
        DOG = "Dog"
        CAT = "Cat"

        def __str__(self):
            return self.value

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    internal_name = models.CharField(max_length=240, unique=True)
    display_name = models.CharField(max_length=240, default="")
    preview_image = models.CharField(max_length=240, default="")
    pack_type = models.CharField(
        max_length=20,
        choices=[(item.value, item.name) for item in PackType],
        default=PackType.MAN.value
    )
    prompts = models.JSONField()
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.internal_name


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
    images_per_prompt = models.IntegerField(default=5)
    is_processing = models.BooleanField(default=False)
    is_success = models.BooleanField(null=True)
    error_message = models.TextField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
    training_image_urls = models.JSONField(blank=True, null=True)
    cropped_image_urls = models.JSONField(blank=True, null=True)
    inference_image_urls = models.JSONField(blank=True, null=True)
    zip_file_url = models.URLField(null=True, blank=True)
    runpod_webhook_time = models.DateTimeField(null=True, blank=True)
    prompts = models.JSONField(blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
