import os
import logging
import yolov5
import cv2
from PIL import Image

logger = logging.getLogger()


class Cropper:
    def _get_largest_object(self, detected_objects):
        return max(detected_objects, key=lambda x: (x[2] - x[0]) * (x[3] - x[1]))

    def auto_zoom(self, input_dir, output_base_dir, model_type):
        logger.info("Cropping photos...")
        model = yolov5.load("/app/yolov5x.pt")
        aspect_ratio_padding = 0.2
        bbox_padding = 0.2
        warnings = []

        # loop over all files in the input directory
        for filename in os.listdir(input_dir):
            # create the full input path and read the file
            input_path = os.path.join(input_dir, filename)
            img = cv2.imread(input_path)

            if img is None:
                continue
            d2, d1, _ = img.shape  # image height and width

            # Run the image through the model
            results = model(img)

            def is_human(x):
                return int(x[5]) == 0

            def is_dog(x):
                return int(x[5]) == 16

            def is_cat(x):
                return int(x[5]) == 15

            model_type_class_map = {
                "man": is_human,
                "woman": is_human,
                "cat": is_cat,
                "dog": is_dog
            }

            def is_large_enough(x, full_image):
                img_area = full_image.shape[0] * full_image.shape[1]  # height * width
                min_percentage = 0.01
                min_human_area = img_area * min_percentage
                return (x[2] - x[0]) * (x[3] - x[1]) > min_human_area

            model_type_identifier = model_type_class_map.get(model_type)
            detected_object = [x for x in results.xyxy[0] if model_type_identifier(x) and is_large_enough(x, img)]

            if not detected_object:
                print(f"No {model_type} detected in the image {input_path}.")
                os.remove(input_path)
                continue

            # Count the number of detected people/cat/dogs
            object_count = len(detected_object)

            # Log an error if more than one person/cat/dog is detected
            if object_count > 1:
                message = f"More than one {model_type} detected in the image: {filename}."
                logger.info(message)
                warnings.append(message)

            # Find the largest object detected in the image
            human = self._get_largest_object(detected_object)

            # Crop the image to the bounding box of the object, add custom padding
            x1, y1, x2, y2 = map(int, human[:4])
            bbox_width = x2 - x1
            bbox_height = y2 - y1
            x1 = max(0, x1 - int(bbox_width * bbox_padding))
            y1 = max(0, y1 - int(bbox_height * bbox_padding))
            x2 = min(d1, x2 + int(bbox_width * bbox_padding))
            y2 = min(d2, y2 + int(bbox_height * bbox_padding))

            orig_width, orig_height = x2 - x1, y2 - y1

            # Calculate padding
            max_orig = max(orig_width, orig_height)
            padded_dim = min(max_orig * (1 + aspect_ratio_padding), min(d1, d2))

            # Center coordinates of the original bounding box
            center_x = x1 + orig_width // 2
            center_y = y1 + orig_height // 2

            # New bounding box coordinates with padding
            new_x1 = center_x - padded_dim // 2
            new_y1 = center_y - padded_dim // 2
            new_x2 = new_x1 + padded_dim
            new_y2 = new_y1 + padded_dim

            # Check if the new bounding box is within the image
            if new_x1 < 0:
                new_x1 = 0
            if new_y1 < 0:
                new_y1 = 0
            if new_x2 > d1:
                new_x2 = d1
            if new_y2 > d2:
                new_y2 = d2

            # Crop the image
            cropped_img = img[int(new_y1): int(new_y2), int(new_x1): int(new_x2)]

            # Convert BGR image to RGB for PIL
            cropped_img_rgb = cv2.cvtColor(cropped_img, cv2.COLOR_BGR2RGB)

            # Convert array to Image for visualization
            result_img = Image.fromarray(cropped_img_rgb)

            # create the full output path and write the file
            output_path = os.path.join(output_base_dir, filename)
            logger.info(f"Saving cropped image to {output_path}")
            result_img.save(output_path)

        logger.info("Cropping is complete!")
        return warnings
