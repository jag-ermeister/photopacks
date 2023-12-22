import vertexai
from vertexai.vision_models import ImageTextModel, Image
from google.oauth2 import service_account
import os


def get_image_caption(image_path):
    project_id = 'mimic-dev-391917'
    location = 'us-central1'
    credentials_file_path = 'mimic-dev-391917-f58102d4a50c.json'

    credentials = service_account.Credentials.from_service_account_file(credentials_file_path)

    vertexai.init(project=project_id, location=location, credentials=credentials)
    model = ImageTextModel.from_pretrained("imagetext@001")

    source_image = Image.load_from_file(location=image_path)

    captions = model.get_captions(
        image=source_image,
        number_of_results=1,
        language="en",
    )
    return captions[0]


def print_captions():
    directory = 'pug'
    files = os.listdir(directory)
    first_five_images = files[:5]

    for image_file in first_five_images:
        image_path = os.path.join(directory, image_file)
        caption = get_image_caption(image_path)
        print(caption)


print_captions()
