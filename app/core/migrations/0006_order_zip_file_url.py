# Generated by Django 4.2.8 on 2023-12-13 04:51

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0005_promptpack_created_date_promptpack_modified_date"),
    ]

    operations = [
        migrations.AddField(
            model_name="order",
            name="zip_file_url",
            field=models.URLField(blank=True, null=True),
        ),
    ]
