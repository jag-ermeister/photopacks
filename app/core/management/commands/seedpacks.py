import uuid
from django.core.management.base import BaseCommand
from core.models import PromptPack
from .prompts import holiday_pack_1, scifi_pack_1, fantasy_pack_1, abstract_pack_1, \
    fashion_pack_1, headshots_women_pack, oil_painting_pets, professional_women_pack


class Command(BaseCommand):
    help = 'Seeds the database with PromptPack data'

    def handle(self, *args, **kwargs):
        PromptPack.objects.update_or_create(
            internal_name="Holiday - Dog",
            defaults={
                'display_name': "Christmas",
                'pack_type': PromptPack.PackType.DOG.value,
                'preview_image': "christmas_dog.jpg",
                'prompts': holiday_pack_1
            }
        )

        PromptPack.objects.update_or_create(
            internal_name="Holiday - Cat",
            defaults={
                'display_name': "Christmas",
                'pack_type': PromptPack.PackType.CAT.value,
                'preview_image': "christmas_cat.jpg",
                'prompts': holiday_pack_1
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
            internal_name="Fashion - Woman",
            defaults={
                'display_name': "Fashion",
                'pack_type': PromptPack.PackType.WOMAN.value,
                'preview_image': "photoshoot_woman.jpeg",
                'prompts': fashion_pack_1
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

        PromptPack.objects.update_or_create(
            internal_name="Headshots - Woman",
            defaults={
                'display_name': "Headshots",
                'pack_type': PromptPack.PackType.WOMAN.value,
                'preview_image': "headshots.jpeg",
                'prompts': headshots_women_pack
            }
        )

        PromptPack.objects.update_or_create(
            internal_name="Oil Painting - Dog",
            defaults={
                'display_name': "Oil Painting",
                'pack_type': PromptPack.PackType.DOG.value,
                'preview_image': "oil_painting_dog.jpg",
                'prompts': oil_painting_pets
            }
        )

        PromptPack.objects.update_or_create(
            internal_name="Oil Painting - Cat",
            defaults={
                'display_name': "Oil Painting",
                'pack_type': PromptPack.PackType.CAT.value,
                'preview_image': "oil_painting_cat.jpg",
                'prompts': oil_painting_pets
            }
        )

        PromptPack.objects.update_or_create(
            internal_name="Professional - Woman",
            defaults={
                'display_name': "Professional",
                'pack_type': PromptPack.PackType.WOMAN.value,
                'preview_image': "headshots.jpeg",
                'prompts': professional_women_pack
            }
        )

        self.stdout.write(self.style.SUCCESS('PromptPacks were seeded successfully.'))
