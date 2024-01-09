import unittest
import logging
from cropper import Cropper
from face_cropper import FaceCropper


class TestCropper(unittest.TestCase):
    def setUp(self):
        logging.basicConfig(level=logging.INFO)
        self.cropper = Cropper()
        self.face_cropper = FaceCropper()

    # def test_chris_photos(self):
    #     self.cropper.auto_zoom('test_images/chris/input', 'test_images/chris/crop-output', 'man', '../ai/runpod/yolov5x.pt')

    def test_face_cropper(self):
        self.face_cropper.make_square_crop('test_images/chris/crop-output', 'test_images/chris/face-output')
