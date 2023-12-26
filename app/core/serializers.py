from rest_framework import serializers
from .models import Order, PromptPack


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            'id',
            'user',
            'subject_name',
            'model_type',
            'prompt_pack_1',
            'prompt_pack_2',
            'prompt_pack_3',
            'prompt_pack_4',
            'prompt_pack_5',
            'is_processing',
            'is_success',
            'inference_image_urls',
            'created_date',
            'modified_date'
        )
        extra_kwargs = {'user': {'read_only': True}}

    def create(self, validated_data):
        user = self.context['request'].user
        order = Order(
            user=user,
            subject_name=validated_data.get('subject_name'),
            prompt_pack_1=validated_data.get('prompt_pack_1'),
            prompt_pack_2=validated_data.get('prompt_pack_2'),
            prompt_pack_3=validated_data.get('prompt_pack_3'),
            prompt_pack_4=validated_data.get('prompt_pack_4'),
            prompt_pack_5=validated_data.get('prompt_pack_5'),
            model_type=validated_data.get('model_type'),
            speed_type=Order.SpeedType.TEST.value,
            fulfillment_service=Order.FulfillmentService.RUNPOD.value,
        )
        order.save()
        return order


class PromptPackSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromptPack
        fields = ['id', 'display_name', 'preview_image', 'pack_type', 'created_date', 'modified_date']
