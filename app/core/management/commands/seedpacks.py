import uuid
from django.core.management.base import BaseCommand
from core.models import PromptPack
from .prompts import holiday_pack_1, holiday_pack_2, holiday_pack_3


class Command(BaseCommand):
    help = 'Seeds the database with PromptPack data'

    def handle(self, *args, **kwargs):
        PromptPack.objects.update_or_create(
            name="Holiday Pack 1",
            defaults={'prompts': holiday_pack_1}
        )

        PromptPack.objects.update_or_create(
            name="Holiday Pack 2",
            defaults={'prompts': holiday_pack_1}
        )

        PromptPack.objects.update_or_create(
            name="Holiday Pack 3",
            defaults={'prompts': holiday_pack_1}
        )

        self.stdout.write(self.style.SUCCESS('PromptPacks were seeded successfully.'))
