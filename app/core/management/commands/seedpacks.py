import uuid
from django.core.management.base import BaseCommand
from core.models import PromptPack
from .prompts import holiday_pack_1, holiday_pack_2, holiday_pack_3, scifi_pack_1, fantasy_pack_1, abstract_pack_1, \
    photoshoot_pack_1


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

        PromptPack.objects.update_or_create(
            name="Sci-Fi Pack 1",
            defaults={'prompts': scifi_pack_1}
        )

        PromptPack.objects.update_or_create(
            name="Fantasy Pack 1",
            defaults={'prompts': fantasy_pack_1}
        )

        PromptPack.objects.update_or_create(
            name="Photoshoot Pack 1",
            defaults={'prompts': photoshoot_pack_1}
        )

        PromptPack.objects.update_or_create(
            name="Abstract Pack 1",
            defaults={'prompts': abstract_pack_1}
        )

        self.stdout.write(self.style.SUCCESS('PromptPacks were seeded successfully.'))
