import json
import pytest
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from .models import Order

User = get_user_model()


@pytest.mark.django_db
def test_create_order(authenticated_client, prompt_pack):
    url = reverse('orders_list')
    data = {
        'subject_name': 'test',
        'prompt_pack': prompt_pack.id,
        'model_type': 'man',
    }

    response = authenticated_client.post(url, data)

    assert response.status_code == 201
    assert 'id' in response.data


@pytest.mark.django_db
def test_get_orders_list(authenticated_client, prompt_pack):
    authenticated_user = authenticated_client.user
    Order.objects.create(user=authenticated_user, subject_name='Order 1', prompt_pack=prompt_pack, model_type='man')
    Order.objects.create(user=authenticated_user, subject_name='Order 2', prompt_pack=prompt_pack, model_type='man')

    unauthenticated_user = User.objects.create(username='otheruser', cognito_id='test_id')
    Order.objects.create(
        user=unauthenticated_user,
        subject_name='Order 3',
        prompt_pack=prompt_pack,
        model_type='man'
    )

    url = reverse('orders_list')
    response = authenticated_client.get(url)

    assert response.status_code == 200
    assert len(response.data) == 2
    for order_data in response.data:
        assert order_data['user'] == authenticated_user.id


@pytest.mark.django_db
def test_prompt_pack_list(authenticated_client, create_prompt_pack):
    pack1 = create_prompt_pack(internal_name="Pack 1", display_name="Pack 1", prompts=["prompt 1", "prompt 2"])
    pack2 = create_prompt_pack(internal_name="Pack 2", display_name="Pack 2", prompts=["prompt 3", "prompt 4"])

    url = reverse('prompt-pack-list')
    response = authenticated_client.get(url)

    assert response.status_code == 200
    assert len(response.data) == 2
    data = json.loads(response.content)
    assert data[0]['display_name'] == pack1.display_name
    assert data[1]['display_name'] == pack2.display_name


@pytest.mark.django_db
def test_prompt_pack_detail(authenticated_client, prompt_pack):
    url = reverse('prompt-pack-detail', kwargs={'id': prompt_pack.id})

    response = authenticated_client.get(url)

    assert response.status_code == 200
    assert response.data['id'] == str(prompt_pack.id)
    assert response.data['display_name'] == prompt_pack.display_name
