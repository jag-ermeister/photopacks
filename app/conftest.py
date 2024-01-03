import pytest
from django.contrib.auth import get_user_model
from core.models import Order, PromptPack
from rest_framework.test import APIClient
from django.conf import settings


User = get_user_model()


@pytest.fixture(autouse=True)
def disable_welcome_email(monkeypatch):
    monkeypatch.setattr(settings, 'WELCOME_EMAIL_ENABLED', False)


@pytest.fixture
def authenticated_client(prompt_pack_user):
    client = APIClient()
    client.force_authenticate(user=prompt_pack_user)
    client.user = prompt_pack_user
    return client


@pytest.fixture
def prompt_pack_user():
    user_id = 6
    user = User.objects.create_user(
        username="username", password="password", id=user_id
    )
    return user


@pytest.fixture
def prompt_pack():
    return PromptPack.objects.create(
        internal_name="Test Prompt Pack",
        display_name="Prompt Pack",
        preview_image="image.jpeg",
        pack_type=PromptPack.PackType.MAN.value,
        prompts=["prompt 1", "prompt 2"]
    )


@pytest.fixture
def create_prompt_pack(db):
    def make_prompt_pack(**kwargs):
        return PromptPack.objects.create(**kwargs)
    return make_prompt_pack


@pytest.fixture
def order(prompt_pack_user, prompt_pack):
    return Order.objects.create(
        user=prompt_pack_user,
        subject_name="Jeremy",
        prompt_pack_1=prompt_pack,
        model_type=Order.ModelType.MAN.value,
        speed_type=Order.SpeedType.FAST.value,
        fulfillment_service=Order.FulfillmentService.RUNPOD.value,
        is_submitted=False,
        is_success=False,

    )
