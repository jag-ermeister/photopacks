import uuid
from django.core.management.base import BaseCommand
from core.models import PromptPack


class Command(BaseCommand):
    help = 'Seeds the database with PromptPack data'

    def handle(self, *args, **kwargs):
        holiday_prompts = ["prompt1", "prompt3"]
        PromptPack.objects.update_or_create(
            name="Holiday",
            defaults={'prompts': holiday_prompts}
        )

        self.stdout.write(self.style.SUCCESS('PromptPacks were seeded successfully.'))
