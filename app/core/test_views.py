from unittest.mock import patch
import json
import pytest
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from .models import Order

User = get_user_model()


@pytest.mark.django_db
def test_create_order(authenticated_client, prompt_pack, create_prompt_pack):
    pack2 = create_prompt_pack(internal_name="Pack 2", display_name="Pack 2", prompts=["prompt 3", "prompt 4"])
    pack3 = create_prompt_pack(internal_name="Pack 3", display_name="Pack 3", prompts=["prompt 5", "prompt 6"])
    pack4 = create_prompt_pack(internal_name="Pack 4", display_name="Pack 4", prompts=["prompt 7", "prompt 8"])
    pack5 = create_prompt_pack(internal_name="Pack 5", display_name="Pack 5", prompts=["prompt 9", "prompt 10"])

    url = reverse('orders_list')
    data = {
        'subject_name': 'test',
        'prompt_pack_1': prompt_pack.id,
        'prompt_pack_2': pack2.id,
        'prompt_pack_3': pack3.id,
        'prompt_pack_4': pack4.id,
        'prompt_pack_5': pack5.id,
        'model_type': 'man',
    }

    response = authenticated_client.post(url, data)

    assert response.status_code == 201
    assert 'id' in response.data


@pytest.mark.django_db
@patch('requests.post')
def test_patch_order(mock_post, authenticated_client, order, create_prompt_pack, monkeypatch):
    mock_post.return_value.status_code = 201
    mock_post.return_value.json.return_value = {"success": True}

    monkeypatch.setenv('AWS_ACCESS_KEY_ID', 'test_access_key_id')
    monkeypatch.setenv('AWS_SECRET_ACCESS_KEY', 'test_secret_access_key')
    monkeypatch.setenv('AWS_S3_REGION_NAME', 'us-east-1')
    monkeypatch.setenv('RUNPOD_JOB_SUBMIT_URL', 'https://runpod.io/fake-url')
    monkeypatch.setenv('RUNPOD_API_KEY', 'test_runpod_api_key')
    monkeypatch.setenv('API_URL', 'https://fakephotopacks.ai')
    monkeypatch.setenv('ORDER_IMAGES_S3_BUCKET_NAME', 'fake-bucket-name')

    order.prompt_pack_2 = create_prompt_pack(internal_name="Pack 2", display_name="Pack 2", prompts=["prompt 3", "prompt 4"])
    order.prompt_pack_3 = create_prompt_pack(internal_name="Pack 3", display_name="Pack 3", prompts=["prompt 5", "prompt 6"])
    order.prompt_pack_4 = create_prompt_pack(internal_name="Pack 4", display_name="Pack 4", prompts=["prompt 7", "prompt 8"])
    order.prompt_pack_5 = create_prompt_pack(internal_name="Pack 5", display_name="Pack 5", prompts=["prompt 9", "prompt 10"])
    order.save()

    url = reverse('order_detail', kwargs={'pk': str(order.id)})
    training_image_urls = ["new_image_url1.jpg", "new_image_url2.jpg"]
    response = authenticated_client.patch(url, {
        "training_image_urls": training_image_urls
    }, format='json')

    assert response.status_code == 200
    updated_order = Order.objects.get(pk=order.id)
    assert updated_order.training_image_urls == training_image_urls

    # assert on request body to runpod
    kwargs = mock_post.call_args.kwargs
    request_body = kwargs.get('json', {})
    assert request_body['input']['order_id'] == response.data['id']
    assert request_body['input']['model_type'] == 'man'
    assert request_body['input']['prompts'] == [
        'prompt 1',
        'prompt 2',
        'prompt 3',
        'prompt 4',
        'prompt 5',
        'prompt 6',
        'prompt 7',
        'prompt 8',
        'prompt 9',
        'prompt 10',
    ]


@pytest.mark.django_db
def test_get_orders(authenticated_client, order, prompt_pack):
    url = reverse('order_detail', kwargs={'pk': str(order.id)})
    response = authenticated_client.get(url)

    assert response.status_code == 200
    assert response.data['id'] == str(order.id)
    assert response.data['prompt_pack_1']['id'] == str(prompt_pack.id)
    assert response.data['prompt_pack_1']['display_name'] == prompt_pack.display_name
    assert response.data['prompt_pack_1']['preview_image'] == prompt_pack.preview_image
    assert response.data['prompt_pack_1']['pack_type'] == prompt_pack.pack_type


@pytest.mark.django_db
def test_get_orders_list(authenticated_client, prompt_pack):
    authenticated_user = authenticated_client.user
    Order.objects.create(user=authenticated_user, subject_name='Order 1', prompt_pack_1=prompt_pack, model_type='man')
    Order.objects.create(user=authenticated_user, subject_name='Order 2', prompt_pack_1=prompt_pack, model_type='man')

    unauthenticated_user = User.objects.create(username='otheruser', cognito_id='test_id')
    Order.objects.create(
        user=unauthenticated_user,
        subject_name='Order 3',
        prompt_pack_1=prompt_pack,
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
