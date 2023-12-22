import vertexai
from vertexai.vision_models import ImageTextModel, Image
from google.oauth2 import service_account
from breed_list import dog_breed_list
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


def analyze_captions(captions):
    color_words = {'white', 'black', 'brown', 'gray', 'tan', 'golden'}

    single_color_count = 0
    color_found = ""
    for caption in captions:
        words = caption.lower().split()
        for i in range(len(words)):
            breed_found = False

            # Check if the current word is "dog"
            if words[i] == "dog":
                breed_found = True

            # Check for breed names of varying lengths
            if not breed_found:
                for j in range(i, min(i + 5, len(words))):  # Adjust '5' to the max length of breed name
                    breed_candidate = ' '.join(words[i:j + 1]).strip()
                    if breed_candidate in dog_breed_list:
                        breed_found = True
                        break  # Break if a breed is found

            if breed_found:
                # Check if the preceding word is a color
                if i > 0 and words[i - 1] in color_words:
                    # Check for single or multiple colors
                    if i > 1 and words[i - 2] == "and":
                        return ""  # Multiple colors found
                    else:
                        single_color_count += 1
                        color_found = words[i - 1]
                    break  # Break after a color check
                else:
                    return ""  # No color found

    # Decide based on the count
    if single_color_count >= 4:
        logger.info(f"At least 4 of the images determined that the dog is: {color_found}")
        return color_found
    else:
        logger.info("A solid color dog was not detected.")
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
