from retinaface import RetinaFace
from PIL import Image
import cv2
import os


class FaceCropper:
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
                return

            # Detect faces in the image
            faces = self.detector.detect_faces(img)
            if not faces:
                print(f"No faces found in {input_path}")
                return

            # Get the largest face
            largest_face = self._get_largest_face(faces)
            if largest_face is None:
                print("No face detected.")
                return

                # Unpack the bounding box coordinates
            x1, y1, x2, y2 = largest_face  # Change here

            face_width = x2 - x1
            face_height = y2 - y1

            # Center the square crop around the face
            center_x, center_y = x1 + face_width // 2, y1 + face_height // 2
            square_size = max(face_width, face_height)

            # Calculate new square coordinates
            new_x1 = max(center_x - square_size // 2, 0)
            new_y1 = max(center_y - square_size // 2, 0)
            new_x2 = min(new_x1 + square_size, img.shape[1])
            new_y2 = min(new_y1 + square_size, img.shape[0])

            # Crop the image
            cropped_img = img[new_y1:new_y2, new_x1:new_x2]

            # Convert BGR image to RGB for PIL
            cropped_img_rgb = cv2.cvtColor(cropped_img, cv2.COLOR_BGR2RGB)
            result_img = Image.fromarray(cropped_img_rgb)

            # Save the cropped image
            result_img.save(output_path)
