import json
import pytest
from django.urls import reverse
from rest_framework.test import APIClient


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
def test_prompt_pack_list(authenticated_client, create_prompt_pack):
    pack1 = create_prompt_pack(name="Pack 1", prompts=["prompt 1", "prompt 2"])
    pack2 = create_prompt_pack(name="Pack 2", prompts=["prompt 3", "prompt 4"])

    url = reverse('prompt-pack-list')
    response = authenticated_client.get(url)

    assert response.status_code == 200
    assert len(response.data) == 2
    data = json.loads(response.content)
    assert data[0]['name'] == pack1.name
    assert data[1]['name'] == pack2.name


@pytest.mark.django_db
def test_prompt_pack_detail(authenticated_client, prompt_pack):
    url = reverse('prompt-pack-detail', kwargs={'id': prompt_pack.id})

    response = authenticated_client.get(url)

    assert response.status_code == 200
    assert response.data['id'] == str(prompt_pack.id)
    assert response.data['name'] == prompt_pack.name
