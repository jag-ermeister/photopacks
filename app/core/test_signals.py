import pytest
from django.core import mail
from unittest.mock import patch
from django.contrib.auth import get_user_model

User = get_user_model()


@pytest.mark.django_db
@patch('core.services.EmailService.send_welcome_email')
def test_welcome_email_sent_on_user_creation(mock_email_service, monkeypatch):
    monkeypatch.setenv('SENDGRID_API_KEY', 'test_sendgrid_api_key')
    monkeypatch.setattr('django.conf.settings.WELCOME_EMAIL_ENABLED', True)
    user = User.objects.create_user(username='testuser', email='test@example.com', password='password')
    mock_email_service.assert_called_with(user)
