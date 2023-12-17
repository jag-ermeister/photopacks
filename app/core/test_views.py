import pytest
from django.urls import reverse


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
