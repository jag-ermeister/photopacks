from .test_payloads.runpod_payloads import runpod_webhook_failure, runpod_webhook_successful
import pytest
from django.urls import reverse


@pytest.mark.django_db
def test_update_order(client, order):
    payload = {
        "image_urls": ["image-url-1", "image-url-2"]
    }
    url = reverse('update_order', kwargs={'order_id': order.id})
    response = client.post(url, payload, content_type='application/json')

    order.refresh_from_db()
    assert response.status_code == 200
    assert order.is_success is True
    assert order.inference_image_urls == ["image-url-1", "image-url-2"]


@pytest.mark.django_db
def test_runpod_webhook_successful(client, order):
    url = reverse('runpod_webhook', kwargs={'order_id': order.id})
    response = client.post(url, runpod_webhook_successful, content_type='application/json')

    order.refresh_from_db()
    assert response.status_code == 200
    assert order.runpod_webhook_time is not None


@pytest.mark.django_db
def test_runpod_webhook_failure(client, order):
    url = reverse('runpod_webhook', kwargs={'order_id': order.id})
    response = client.post(url, runpod_webhook_failure, content_type='application/json')

    order.refresh_from_db()
    assert response.status_code == 200
    assert order.is_success is False
    assert order.error_message == 'error message from runpod'
    assert order.runpod_webhook_time is not None
