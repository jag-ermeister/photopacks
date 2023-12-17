from rest_framework import serializers
from .models import Order, PromptPack


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'user', 'subject_name', 'model_type', 'prompt_pack', 'is_processing', 'is_success', 'created_date', 'modified_date')
        extra_kwargs = {'user': {'read_only': True}}

    def create(self, validated_data):

        user = self.context['request'].user
        order = Order(
            user=user,
            subject_name=validated_data.get('subject_name'),
            prompt_pack=validated_data.get('prompt_pack'),
            model_type=validated_data.get('model_type'),
            speed_type=Order.SpeedType.TEST.value,
            fulfillment_service=Order.FulfillmentService.RUNPOD.value,
        )
        order.save()
        return order


class PromptPackSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromptPack
        fields = ['id', 'name', 'created_date', 'modified_date']
