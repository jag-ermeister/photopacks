import pytest
from django.contrib.auth import get_user_model
from core.models import Order, PromptPack

User = get_user_model()


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
        name="Test Prompt Pack",
        prompts=["prompt 1", "prompt 2"]
    )


@pytest.fixture
def order(prompt_pack_user, prompt_pack):
    return Order.objects.create(
        user=prompt_pack_user,
        subject_name="Jeremy",
        prompt_pack=prompt_pack,
        model_type=Order.ModelType.MAN.value,
        speed_type=Order.SpeedType.FAST.value,
        fulfillment_service=Order.FulfillmentService.RUNPOD.value,
        is_processing=False,
        is_success=False,

    )