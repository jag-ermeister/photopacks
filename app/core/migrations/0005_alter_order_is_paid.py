# Generated by Django 4.2.8 on 2024-01-01 01:31

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0004_alter_order_is_paid"),
    ]

    operations = [
        migrations.AlterField(
            model_name="order",
            name="is_paid",
            field=models.BooleanField(null=True),
        ),
    ]
