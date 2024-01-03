from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .services import EmailService
from django.conf import settings
from django.conf import settings


User = get_user_model()


@receiver(post_save, sender=User)
def send_welcome_email(sender, instance, created, **kwargs):
    if created and settings.WELCOME_EMAIL_ENABLED:
        email_service = EmailService()
        email_service.send_welcome_email(instance)