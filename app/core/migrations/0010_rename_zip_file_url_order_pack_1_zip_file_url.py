# Generated by Django 4.2.8 on 2024-01-05 17:09

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0009_remove_order_inference_image_urls"),
    ]

    operations = [
        migrations.RenameField(
            model_name="order",
            old_name="zip_file_url",
            new_name="pack_1_zip_file_url",
        ),
    ]