from django.db import models
from django.contrib.auth.models import User


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subject_name = models.CharField(max_length=240)
    created_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    is_processing = models.BooleanField(default=False)
    is_success = models.BooleanField(null=True)
    error_message = models.CharField(max_length=320, null=True, blank=True)

    def __str__(self):
        return self.subject_name