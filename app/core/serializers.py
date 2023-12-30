from rest_framework import serializers
from .models import Order, PromptPack
from django.shortcuts import get_object_or_404


class OrderSerializer(serializers.ModelSerializer):
    prompt_pack_1 = serializers.UUIDField(format='hex_verbose')
    prompt_pack_2 = serializers.UUIDField(format='hex_verbose', required=False)
    prompt_pack_3 = serializers.UUIDField(format='hex_verbose', required=False)
    prompt_pack_4 = serializers.UUIDField(format='hex_verbose', required=False)
    prompt_pack_5 = serializers.UUIDField(format='hex_verbose', required=False)

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
            'zip_file_url',
            'training_image_urls',
            'inference_image_urls',
            'created_date',
            'modified_date'
        )
        extra_kwargs = {'user': {'read_only': True}}

    def create(self, validated_data):
        user = self.context['request'].user

        prompt_pack_1_id = validated_data.pop('prompt_pack_1', None)
        prompt_pack_2_id = validated_data.pop('prompt_pack_2', None)
        prompt_pack_3_id = validated_data.pop('prompt_pack_3', None)
        prompt_pack_4_id = validated_data.pop('prompt_pack_4', None)
        prompt_pack_5_id = validated_data.pop('prompt_pack_5', None)

        prompt_pack_1 = get_object_or_404(PromptPack, id=prompt_pack_1_id) if prompt_pack_1_id else None
        prompt_pack_2 = get_object_or_404(PromptPack, id=prompt_pack_2_id) if prompt_pack_2_id else None
        prompt_pack_3 = get_object_or_404(PromptPack, id=prompt_pack_3_id) if prompt_pack_3_id else None
        prompt_pack_4 = get_object_or_404(PromptPack, id=prompt_pack_4_id) if prompt_pack_4_id else None
        prompt_pack_5 = get_object_or_404(PromptPack, id=prompt_pack_5_id) if prompt_pack_5_id else None

        order = Order(
            user=user,
            subject_name=validated_data.get('subject_name'),
            prompt_pack_1=prompt_pack_1,
            prompt_pack_2=prompt_pack_2,
            prompt_pack_3=prompt_pack_3,
            prompt_pack_4=prompt_pack_4,
            prompt_pack_5=prompt_pack_5,
            model_type=validated_data.get('model_type'),
            speed_type=Order.SpeedType.TEST.value,
            fulfillment_service=Order.FulfillmentService.RUNPOD.value,
        )
        print('about to save from serializer')
        order.save()
        print('saved from serializer')
        return order

    def to_representation(self, instance):
        representation = super(OrderSerializer, self).to_representation(instance)
        representation['prompt_pack_1'] = PromptPackSerializer(instance.prompt_pack_1).data
        if instance.prompt_pack_2:
            representation['prompt_pack_2'] = PromptPackSerializer(instance.prompt_pack_2).data
        if instance.prompt_pack_3:
            representation['prompt_pack_3'] = PromptPackSerializer(instance.prompt_pack_3).data
        if instance.prompt_pack_4:
            representation['prompt_pack_4'] = PromptPackSerializer(instance.prompt_pack_4).data
        if instance.prompt_pack_5:
            representation['prompt_pack_5'] = PromptPackSerializer(instance.prompt_pack_5).data
        return representation


class PromptPackSerializer(serializers.ModelSerializer):
    class Meta:
        model = PromptPack
        fields = ['id', 'display_name', 'preview_image', 'pack_type', 'created_date', 'modified_date']
