import os
import logging
import cv2
from PIL import Image
import yolov5

logger = logging.getLogger()




class Cropper:
    def _get_largest_object(self, detected_objects):
        return max(detected_objects, key=lambda x: (x[2] - x[0]) * (x[3] - x[1]))

    def auto_zoom(self, input_dir, output_base_dir, model_type, yolo_path):
        logger.info("Cropping photos...")
        model = yolov5.load(yolo_path)
        warnings = []

        for filename in os.listdir(input_dir):
            input_path = os.path.join(input_dir, filename)
            img = cv2.imread(input_path)

            if img is None:
                continue
            d2, d1, _ = img.shape  # image dimensions

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

            largest_object = self._get_largest_object(detected_object)
            x1, y1, x2, y2, conf, cls = map(int, largest_object[:6])

            bbox_width = x2 - x1
            bbox_height = y2 - y1

            square_size = max(bbox_width, bbox_height)
            center_x = x1 + bbox_width // 2
            center_y = y1 + bbox_height // 2

            new_x1 = max(center_x - square_size // 2, 0)
            new_y1 = max(center_y - square_size // 2, 0)
            new_x2 = min(new_x1 + square_size, d1)
            new_y2 = min(new_y1 + square_size, d2)

            cropped_img = img[new_y1:new_y2, new_x1:new_x2]

            cropped_img_rgb = cv2.cvtColor(cropped_img, cv2.COLOR_BGR2RGB)
            result_img = Image.fromarray(cropped_img_rgb)

            output_path = os.path.join(output_base_dir, filename)
            logger.info(f"Saving cropped image to {output_path}")
            result_img.save(output_path)

        logger.info("Cropping is complete!")
        return warnings