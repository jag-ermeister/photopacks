import unittest
import logging
from subject_cropper import SubjectCropper
from square_cropper import SquareCropper


class TestCropper(unittest.TestCase):
    def setUp(self):
        logging.basicConfig(level=logging.INFO)
        self.subject_cropper = SubjectCropper()
        self.square_cropper = SquareCropper()

    def test_chris_photos(self):
        self.subject_cropper.auto_zoom('test_images/chris/input', 'test_images/chris/subject-output', 'man', 'yolov5x.pt')
        self.square_cropper.make_square_crop('test_images/chris/subject-output', 'test_images/chris/square-output')
