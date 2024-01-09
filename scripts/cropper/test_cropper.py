import unittest
import logging
from cropper import Cropper


class TestCropper(unittest.TestCase):
    def setUp(self):
        logging.basicConfig(level=logging.INFO)
        self.cropper = Cropper()

    def test_chris_photos(self):
        self.cropper.auto_zoom('test_images/chris/input', 'test_images/chris/crop-output', 'man', '../ai/runpod/yolov5x.pt')



