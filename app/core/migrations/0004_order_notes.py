# Generated by Django 4.2.8 on 2023-12-13 02:52

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0003_order_runpod_webhook_time_alter_order_error_message"),
    ]

    operations = [
        migrations.AddField(
            model_name="order",
            name="notes",
            field=models.TextField(blank=True, null=True),
        ),
    ]