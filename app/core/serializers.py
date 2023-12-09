from rest_framework import serializers
from .models import Order


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'user', 'subject_name', 'is_processing', 'is_success', 'created_date', 'modified_date')
