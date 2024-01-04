from .test_payloads.runpod_payloads import runpod_webhook_failure, runpod_webhook_successful
from core.models import Order
from unittest.mock import patch
from django.urls import reverse
import pytest


@pytest.mark.django_db
@patch('core.services.EmailService.send_order_complete_email')
def test_update_order(mock_email_service, client, order, monkeypatch):
    monkeypatch.setenv('SENDGRID_API_KEY', 'test_sendgrid_api_key')

    payload = {
        "pack_1_inference_image_urls": ["image-url-1", "image-url-2"],
        "cropped_image_urls": ["image-url-1", "image-url-2"],
        "zip_url": 'zip-url'
    }
    url = reverse('update_order', kwargs={'order_id': order.id})
    response = client.post(url, payload, content_type='application/json')

    order.refresh_from_db()
    assert response.status_code == 200
    assert order.is_success is True
    assert order.pack_1_inference_image_urls == ["image-url-1", "image-url-2"]
    assert order.cropped_image_urls == ["image-url-1", "image-url-2"]
    assert order.zip_file_url == 'zip-url'

    mock_email_service.assert_called_with(order)


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


@pytest.mark.django_db
@patch('requests.post')
def test_submit_orders_for_processing_ready_orders(mock_post, authenticated_client, prompt_pack, monkeypatch):
    mock_post.return_value.status_code = 201
    mock_post.return_value.json.return_value = {"success": True}

    monkeypatch.setenv('AWS_ACCESS_KEY_ID', 'test_access_key_id')
    monkeypatch.setenv('AWS_SECRET_ACCESS_KEY', 'test_secret_access_key')
    monkeypatch.setenv('AWS_S3_REGION_NAME', 'us-east-1')
    monkeypatch.setenv('RUNPOD_JOB_SUBMIT_URL', 'https://runpod.io/fake-url')
    monkeypatch.setenv('RUNPOD_API_KEY', 'test_runpod_api_key')
    monkeypatch.setenv('API_URL', 'https://fakephotopacks.ai')
    monkeypatch.setenv('ORDER_IMAGES_S3_BUCKET_NAME', 'fake-bucket-name')

    test_order = Order.objects.create(
        user=authenticated_client.user,
        subject_name="Test",
        prompt_pack_1=prompt_pack,
        model_type=Order.ModelType.MAN.value,
        speed_type=Order.SpeedType.FAST.value,
        fulfillment_service=Order.FulfillmentService.RUNPOD.value,
        training_image_urls=['http://example.com/image.jpg'],
        is_submitted=False,
        is_paid=True
    )

    url = reverse('submit_orders_for_processing')
    response = authenticated_client.get(url)

    assert response.status_code == 200
    response_data = response.json()
    assert response_data['num_orders_ready_for_submission'] > 0
    assert len(response_data['submitted_orders']) > 0

    # assert on request body to runpod
    kwargs = mock_post.call_args.kwargs
    request_body = kwargs.get('json', {})
    assert request_body['input']['order_id'] == str(test_order.id)
    assert request_body['input']['model_type'] == Order.ModelType.MAN.value
    assert request_body['input']['pack_1_prompts'] == ['prompt 1', 'prompt 2']
    assert request_body['input']['pack_2_prompts'] == []
    assert request_body['input']['pack_3_prompts'] == []
    assert request_body['input']['pack_4_prompts'] == []
    assert request_body['input']['pack_5_prompts'] == []


@pytest.mark.django_db
def test_submit_orders_for_processing_max_processing(authenticated_client, order):
    # Setup: Create orders that fill up the processing slots
    for _ in range(2):  # Assuming MAX_ORDERS_PROCESSING is 2
        Order.objects.create(
            user=order.user,
            subject_name="Test",
            prompt_pack_1=order.prompt_pack_1,
            model_type=Order.ModelType.MAN.value,
            speed_type=Order.SpeedType.FAST.value,
            fulfillment_service=Order.FulfillmentService.RUNPOD.value,
            is_submitted=True
        )

    url = reverse('submit_orders_for_processing')
    response = authenticated_client.get(url)

    assert response.status_code == 200
    response_data = response.json()
    assert response_data['num_already_processing'] == 2
    assert len(response_data['submitted_orders']) == 0
