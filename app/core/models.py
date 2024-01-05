import uuid
import random
from enum import Enum
from django.db import models, transaction, IntegrityError
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


class OrderSequence(models.Model):
    # Using this because Django does not support auto-incrementing fields that are not primary keys (WHY!?)
    order = models.OneToOneField(
        'Order',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    def __str__(self):
        return str(self.id)


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
    sequence = models.ForeignKey(OrderSequence, on_delete=models.CASCADE, related_name="sequence")
    display_id = models.CharField(max_length=40, unique=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subject_name = models.CharField(max_length=240, null=True, blank=True)
    prompt_pack_1 = models.ForeignKey(PromptPack, on_delete=models.PROTECT, related_name="orders_prompt_pack_1")
    prompt_pack_2 = models.ForeignKey(PromptPack, on_delete=models.PROTECT, related_name="orders_prompt_pack_2", null=True, blank=True)
    prompt_pack_3 = models.ForeignKey(PromptPack, on_delete=models.PROTECT, related_name="orders_prompt_pack_3", null=True, blank=True)
    prompt_pack_4 = models.ForeignKey(PromptPack, on_delete=models.PROTECT, related_name="orders_prompt_pack_4", null=True, blank=True)
    prompt_pack_5 = models.ForeignKey(PromptPack, on_delete=models.PROTECT, related_name="orders_prompt_pack_5", null=True, blank=True)
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
    is_paid = models.BooleanField(null=True)
    is_uploaded = models.BooleanField(null=True)
    is_submitted = models.BooleanField(default=False)
    is_success = models.BooleanField(null=True)
    error_message = models.TextField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
    training_image_urls = models.JSONField(blank=True, null=True)
    cropped_image_urls = models.JSONField(blank=True, null=True)
    pack_1_inference_image_urls = models.JSONField(blank=True, null=True)
    pack_2_inference_image_urls = models.JSONField(blank=True, null=True)
    pack_3_inference_image_urls = models.JSONField(blank=True, null=True)
    pack_4_inference_image_urls = models.JSONField(blank=True, null=True)
    pack_5_inference_image_urls = models.JSONField(blank=True, null=True)
    zip_file_url = models.URLField(null=True, blank=True)
    runpod_webhook_time = models.DateTimeField(null=True, blank=True)
    prompts = models.JSONField(blank=True, null=True)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    def generate_display_id(self, sequence_id):
        prefix = random.randint(0, 9)
        infix = random.randint(10, 99)
        suffix = random.randint(0, 9)

        sequence_str = str(sequence_id)
        mid_index = len(sequence_str) // 2
        sequence_with_infix = sequence_str[:mid_index] + str(infix) + sequence_str[mid_index:]

        return f"{prefix}{sequence_with_infix}{suffix}"

    def save(self, *args, **kwargs):
        with transaction.atomic():
            if self._state.adding:  # Checking if the object is new
                self.sequence = OrderSequence.objects.create(order=self)
                self.display_id = self.generate_display_id(self.sequence.id)

            super(Order, self).save(*args, **kwargs)


class WhitelistedUser(models.Model):
    email = models.CharField(max_length=100)
