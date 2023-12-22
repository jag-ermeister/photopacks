import vertexai
from vertexai.vision_models import ImageTextModel, Image
from google.oauth2 import service_account
from .breed_list import dog_breed_list
import logging
import os

logger = logging.getLogger()


def get_image_caption(image_path):
    project_id = 'mimic-dev-391917'
    location = 'us-central1'
    credentials_file_path = '/app/mimic-dev-391917-f58102d4a50c.json'

    credentials = service_account.Credentials.from_service_account_file(credentials_file_path)

    vertexai.init(project=project_id, location=location, credentials=credentials)
    model = ImageTextModel.from_pretrained("imagetext@001")

    source_image = Image.load_from_file(location=image_path)

    captions = model.get_captions(
        image=source_image,
        number_of_results=1,
        language="en",
    )
    caption = captions[0]
    logger.info(caption)
    return captions[0]


def strip_breed_from_captions(captions):
    modified_captions = []
    for caption in captions:
        for breed in dog_breed_list:
            # Check if the breed is in the caption
            if breed.lower() in caption.lower():
                # Replace the breed with 'dog'
                modified_captions.append(caption.replace(breed, "dog"))
            else:
                modified_captions.append(caption)
    return modified_captions


def analyze_captions(captions):
    modified_captions = strip_breed_from_captions(captions)
    color_words = {'white', 'black', 'brown', 'gray', 'tan', 'golden'}

    single_color_count = 0
    color_found = ""
    for caption in modified_captions:
        words = caption.split()
        for i in range(len(words)):
            if words[i] == "dog":
                # Check if the preceding word is a color
                if i > 0 and words[i - 1] in color_words:
                    # Check for single or multiple colors
                    if i > 1 and words[i - 2] == "and":
                        return ""  # Multiple colors found
                    else:
                        single_color_count += 1
                        color_found = words[i - 1]
                break  # Break after checking each caption for the word "dog"

    # Decide based on the count
    if single_color_count >= 4:
        return color_found
    else:
        return ""


def get_adjective(training_image_dir, model_type):
    if model_type == "dog":
        logger.info("This is a model of a dog. We will attempt to identify solid colors...")
        files = os.listdir(training_image_dir)
        first_five_images = files[:5]

        try:
            captions = []
            for image_file in first_five_images:
                image_path = os.path.join(training_image_dir, image_file)
                caption = get_image_caption(image_path)
                captions.append(caption)
            color = analyze_captions(captions)
            return color
        except Exception as e:
            logger.info('An error occurred while trying to identify the color of the dog.')
            raise e
    else:
        return ""
