# Generated by Django 4.2.8 on 2024-01-01 01:37

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0005_alter_order_is_paid"),
    ]

    operations = [
        migrations.AddField(
            model_name="order",
            name="is_uploaded",
            field=models.BooleanField(null=True),
        ),
    ]