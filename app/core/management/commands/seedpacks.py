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
            display_name="Christmas Dog",
            pack_type=PromptPack.PackType.DOG.value,
            preview_image="christmas_dog.png",
            defaults={'prompts': holiday_pack_1}
        )

        PromptPack.objects.update_or_create(
            internal_name="Holiday 2 - Dog",
            display_name="Christmas Dog",
            pack_type=PromptPack.PackType.DOG.value,
            preview_image="christmas_dog.png",
            defaults={'prompts': holiday_pack_2}
        )

        PromptPack.objects.update_or_create(
            internal_name="Holiday 3 - Dog",
            display_name="Christmas Dog",
            pack_type=PromptPack.PackType.DOG.value,
            preview_image="christmas_dog.png",
            defaults={'prompts': holiday_pack_3}
        )

        PromptPack.objects.update_or_create(
            internal_name="Holiday 1 - Cat",
            display_name="Christmas Cat",
            pack_type=PromptPack.PackType.CAT.value,
            preview_image="christmas_cat.png",
            defaults={'prompts': holiday_pack_1}
        )

        PromptPack.objects.update_or_create(
            internal_name="Holiday 2 - Cat",
            display_name="Christmas Cat",
            pack_type=PromptPack.PackType.CAT.value,
            preview_image="christmas_cat.png",
            defaults={'prompts': holiday_pack_2}
        )

        PromptPack.objects.update_or_create(
            internal_name="Holiday 3 - Cat",
            display_name="Christmas Cat",
            pack_type=PromptPack.PackType.CAT.value,
            preview_image="christmas_cat.png",
            defaults={'prompts': holiday_pack_3}
        )

        PromptPack.objects.update_or_create(
            internal_name="Sci-Fi - Man",
            display_name="Sci Fi",
            pack_type=PromptPack.PackType.MAN.value,
            preview_image="scifi_man.jpeg",
            defaults={'prompts': scifi_pack_1}
        )

        PromptPack.objects.update_or_create(
            internal_name="Sci-Fi - Woman",
            display_name="Sci Fi",
            pack_type=PromptPack.PackType.WOMAN.value,
            preview_image="scifi_woman.jpeg",
            defaults={'prompts': scifi_pack_1}
        )

        PromptPack.objects.update_or_create(
            internal_name="Fantasy - Man",
            display_name="Fantasy",
            pack_type=PromptPack.PackType.MAN.value,
            preview_image="fantasy_man.jpeg",
            defaults={'prompts': fantasy_pack_1}
        )

        PromptPack.objects.update_or_create(
            internal_name="Photoshoot - Woman",
            display_name="Photoshoot",
            pack_type=PromptPack.PackType.WOMAN.value,
            preview_image="photoshoot_woman.jpeg",
            defaults={'prompts': photoshoot_pack_1}
        )

        PromptPack.objects.update_or_create(
            internal_name="Abstract - Man",
            display_name="Abstract",
            pack_type=PromptPack.PackType.MAN.value,
            preview_image="abstract_man.jpeg",
            defaults={'prompts': abstract_pack_1}
        )

        PromptPack.objects.update_or_create(
            internal_name="Abstract - Woman",
            display_name="Abstract",
            pack_type=PromptPack.PackType.WOMAN.value,
            preview_image="abstract_woman.jpeg",
            defaults={'prompts': abstract_pack_1}
        )

        self.stdout.write(self.style.SUCCESS('PromptPacks were seeded successfully.'))
