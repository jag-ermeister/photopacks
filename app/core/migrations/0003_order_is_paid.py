# Generated by Django 4.2.8 on 2024-01-01 01:28

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0002_rename_is_processing_order_is_submitted"),
    ]

    operations = [
        migrations.AddField(
            model_name="order",
            name="is_paid",
            field=models.BooleanField(default=False),
        ),
    ]
