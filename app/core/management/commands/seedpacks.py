import uuid
from django.core.management.base import BaseCommand
from core.models import PromptPack
from .prompts import holiday_pack_1, holiday_pack_2, holiday_pack_3, scifi_pack_1, fantasy_pack_1, abstract_pack_1, \
    photoshoot_pack_1


class Command(BaseCommand):
    help = 'Seeds the database with PromptPack data'

    def handle(self, *args, **kwargs):
        PromptPack.objects.update_or_create(
            internal_name="Holiday 1 - Dog",
            defaults={
                'display_name': "Christmas Dog",
                'pack_type': PromptPack.PackType.DOG.value,
                'preview_image': "christmas_dog.png",
                'prompts': holiday_pack_1
            }
        )

        PromptPack.objects.update_or_create(
            internal_name="Holiday 2 - Dog",
            defaults={
                'display_name': "Christmas Dog",
                'pack_type': PromptPack.PackType.DOG.value,
                'preview_image': "christmas_dog.png",
                'prompts': holiday_pack_2
            }
        )

        PromptPack.objects.update_or_create(
            internal_name="Holiday 3 - Dog",
            defaults={
                'display_name': "Christmas Dog",
                'pack_type': PromptPack.PackType.DOG.value,
                'preview_image': "christmas_dog.png",
                'prompts': holiday_pack_3
            }
        )

        PromptPack.objects.update_or_create(
            internal_name="Holiday 1 - Cat",
            defaults={
                'display_name': "Christmas Cat",
                'pack_type': PromptPack.PackType.CAT.value,
                'preview_image': "christmas_cat.png",
                'prompts': holiday_pack_1
            }
        )

        PromptPack.objects.update_or_create(
            internal_name="Holiday 2 - Cat",
            defaults={
                'display_name': "Christmas Cat",
                'pack_type': PromptPack.PackType.CAT.value,
                'preview_image': "christmas_cat.png",
                'prompts': holiday_pack_2
            }
        )

        PromptPack.objects.update_or_create(
            internal_name="Holiday 3 - Cat",
            defaults={
                'display_name': "Christmas Cat",
                'pack_type': PromptPack.PackType.CAT.value,
                'preview_image': "christmas_cat.png",
                'prompts': holiday_pack_3
            }
        )

        PromptPack.objects.update_or_create(
            internal_name="Sci-Fi - Man",
            defaults={
                'display_name': "Sci Fi",
                'pack_type': PromptPack.PackType.MAN.value,
                'preview_image': "scifi_man.jpeg",
                'prompts': scifi_pack_1
            }
        )

        PromptPack.objects.update_or_create(
            internal_name="Sci-Fi - Woman",
            defaults={
                'display_name': "Sci Fi",
                'pack_type': PromptPack.PackType.WOMAN.value,
                'preview_image': "scifi_woman.jpeg",
                'prompts': scifi_pack_1
            }
        )

        PromptPack.objects.update_or_create(
            internal_name="Fantasy - Man",
            defaults={
                'display_name': "Fantasy",
                'pack_type': PromptPack.PackType.MAN.value,
                'preview_image': "fantasy_man.jpeg",
                'prompts': fantasy_pack_1
            }
        )

        PromptPack.objects.update_or_create(
            internal_name="Photoshoot - Woman",
            defaults={
                'display_name': "Photoshoot",
                'pack_type': PromptPack.PackType.WOMAN.value,
                'preview_image': "photoshoot_woman.jpeg",
                'prompts': photoshoot_pack_1
            }
        )

        PromptPack.objects.update_or_create(
            internal_name="Abstract - Man",
            defaults={
                'display_name': "Abstract",
                'pack_type': PromptPack.PackType.MAN.value,
                'preview_image': "abstract_man.jpeg",
                'prompts': abstract_pack_1
            }
        )

        PromptPack.objects.update_or_create(
            internal_name="Abstract - Woman",
            defaults={
                'display_name': "Abstract",
                'pack_type': PromptPack.PackType.WOMAN.value,
                'preview_image': "abstract_woman.jpeg",
                'prompts': abstract_pack_1
            }
        )

        self.stdout.write(self.style.SUCCESS('PromptPacks were seeded successfully.'))
