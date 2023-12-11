from django import forms
from django.contrib import admin
from .models import Order
from .services import AiService
from django.conf import settings
from django.forms.widgets import RadioSelect


class MultipleFileInput(forms.ClearableFileInput):
    allow_multiple_selected = True


class MultipleFileField(forms.FileField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault("widget", MultipleFileInput())
        super().__init__(*args, **kwargs)

    def clean(self, data, initial=None):
        single_file_clean = super().clean
        if isinstance(data, (list, tuple)):
            result = [single_file_clean(d, initial) for d in data]
        else:
            result = single_file_clean(data, initial)
        return result


class OrderAdminForm(forms.ModelForm):
    training_images = MultipleFileField()

    class Meta:
        model = Order
        fields = '__all__'
        widgets = {
            'fulfillment_service': RadioSelect,
        }


class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'subject_name', 'model_type', 'speed_type', 'fulfillment_service', 'is_success', 'created_date', 'modified_date')
    form = OrderAdminForm

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)

        # Process each file uploaded
        images = request.FILES.getlist('training_images')
        image_urls = []
        for image in images:
            image_url = AiService().upload_to_s3(image, obj.id)
            image_urls.append(image_url)

        # Save the URLs to the model's field, consider appending if existing data
        if image_urls:
            existing_urls = obj.training_image_urls if obj.training_image_urls else []
            obj.training_image_urls = existing_urls + image_urls
            obj.save()

        if obj.fulfillment_service == Order.FulfillmentService.RUNPOD.value:
            AiService().submit_job_to_runpod(obj)
        elif obj.fulfillment_service == Order.FulfillmentService.BATCH.value:
            AiService().submit_job_to_batch(obj)


admin.site.register(Order, OrderAdmin)
