# Generated by Django 4.2.8 on 2023-12-09 01:36

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="order",
            name="training_image_urls",
            field=models.JSONField(blank=True, null=True),
        ),
    ]
