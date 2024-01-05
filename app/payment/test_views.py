import stripe
import json
import os
import pytest
from unittest.mock import patch
from django.contrib.auth import get_user_model
from .test_payloads.checkout_session_completed import get_checkout_session_completed_payload
from .test_utils import generate_header, send_webhook_request, DUMMY_WEBHOOK_SECRET


User = get_user_model()


@pytest.mark.django_db
def test_construct_event(order):
    payload_json = json.dumps(get_checkout_session_completed_payload(order))
    header = generate_header(
        payload=payload_json, secret=DUMMY_WEBHOOK_SECRET
    )
    event = stripe.Webhook.construct_event(
        payload_json, header, DUMMY_WEBHOOK_SECRET
    )
    assert isinstance(event, stripe.Event)


@pytest.mark.django_db
@patch('core.services.EmailService.send_order_confirmation_email')
def test_send_webhook_checkout_session_completed(mock_email_service, live_server, order, monkeypatch):
    monkeypatch.setenv('STRIPE_WEBHOOK_SECRET', DUMMY_WEBHOOK_SECRET)
    monkeypatch.setenv('SENDGRID_API_KEY', 'test_sendgrid_api_key')

    assert order.is_paid is None

    payload_json = json.dumps(get_checkout_session_completed_payload(order))
    response = send_webhook_request(live_server, payload_json)

    assert response.status_code == 200

    order.refresh_from_db()
    assert order.is_paid is True
    mock_email_service.assert_called_with(order)
