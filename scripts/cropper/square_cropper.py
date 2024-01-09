from retinaface import RetinaFace
from PIL import Image
import cv2
import os


class SquareCropper:
    def __init__(self):
        self.detector = RetinaFace

    def _get_largest_face(self, faces):
        largest_face = None
        max_area = 0
        for face_key in faces:
            face = faces[face_key]
            # The bounding box is typically under 'facial_area' or similar key
            # Adjust the following line based on the exact structure of `face`
            bbox = face.get('facial_area', face.get('bbox'))
            if bbox:
                x1, y1, x2, y2 = bbox
                area = (x2 - x1) * (y2 - y1)
                if area > max_area:
                    max_area = area
                    largest_face = bbox
        return largest_face

    def make_square_crop(self, input_dir, output_dir):
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        for filename in os.listdir(input_dir):
            input_path = os.path.join(input_dir, filename)
            output_path = os.path.join(output_dir, filename)

            img = cv2.imread(input_path)
            if img is None:
                print(f"Image not found: {input_path}")
                continue

            faces = self.detector.detect_faces(img)
            if not faces:
                print(f"No faces found in {input_path}")
                continue

            largest_face = self._get_largest_face(faces)
            if largest_face is None:
                print("No face detected.")
                continue

            x1, y1, x2, y2 = largest_face
            img_height, img_width = img.shape[:2]

            # Determine image orientation and calculate cropping
            if img_width >= img_height:  # Horizontal or square image
                crop_size = img_height
                face_center_x = (x1 + x2) // 2
                new_x1 = max(face_center_x - crop_size // 2, 0)
                new_x2 = min(new_x1 + crop_size, img_width)
                cropped_img = img[0:crop_size, new_x1:new_x2]
            else:  # Vertical image
                crop_size = img_width
                face_center_y = (y1 + y2) // 2
                new_y1 = max(face_center_y - crop_size // 2, 0)
                new_y2 = min(new_y1 + crop_size, img_height)
                cropped_img = img[new_y1:new_y2, 0:crop_size]

            cropped_img_rgb = cv2.cvtColor(cropped_img, cv2.COLOR_BGR2RGB)
            result_img = Image.fromarray(cropped_img_rgb)
            result_img.save(output_path)

