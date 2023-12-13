from django import forms
from django.contrib import admin
from .models import Order, PromptPack
from .services import AiService
from django.conf import settings
from django.forms.widgets import RadioSelect
from django.utils.html import format_html
import json



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
        readonly_fields = ('created_date', 'modified_date')


class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'subject_name', 'prompt_pack', 'model_type', 'speed_type', 'fulfillment_service', 'is_success', 'created_date', 'modified_date')
    form = OrderAdminForm
    readonly_fields = ('created_date', 'modified_date')
    ordering = ('-created_date',)

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

    def changeform_view(self, request, object_id=None, form_url='', extra_context=None):
        extra_context = extra_context or {}
        if object_id:
            order = Order.objects.get(pk=object_id)
            if order.zip_file_url:
                extra_context['show_download_button'] = True
                extra_context['zip_file_url'] = order.zip_file_url
        return super().changeform_view(request, object_id, form_url, extra_context)

    def render_change_form(self, request, context, *args, **kwargs):
        if context.get('show_download_button'):
            context['adminform'].form.fields['zip_file_url'].help_text = format_html(
                '<a href="{}" target="_blank">Download ZIP File</a>', context['zip_file_url']
            )
        return super().render_change_form(request, context, *args, **kwargs)


class PromptPackAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    ordering = ('-created_date',)

    def formatted_prompts(self, obj):
        # Pretty-printing the JSON array
        pretty_json = json.dumps(obj.prompts, indent=4, sort_keys=True)
        return format_html('<pre>{}</pre>', pretty_json)

    formatted_prompts.short_description = 'Prompts'

    def get_readonly_fields(self, request, obj=None):
        if obj:  # editing an existing object
            return self.readonly_fields + ('formatted_prompts',)
        return self.readonly_fields


admin.site.register(Order, OrderAdmin)
admin.site.register(PromptPack, PromptPackAdmin)
