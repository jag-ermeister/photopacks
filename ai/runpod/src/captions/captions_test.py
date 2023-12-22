import unittest
from .captions import analyze_captions


class TestAnalyzeCaptions(unittest.TestCase):
    def setUp(self):
        pass

    def test_single_color_detection(self):
        captions = [
            "black dog in a park",
            "a black dog running",
            "sleeping black dog",
            "black dog under a tree",
            "dog playing"
        ]
        result = analyze_captions(captions)
        self.assertEqual(result, "black")

    def test_no_color_detection(self):
        captions = [
            "dog in a park",
            "dog running",
            "sleeping dog",
            "dog under a tree",
            "dog playing"
        ]
        result = analyze_captions(captions)
        self.assertEqual(result, "")

    def test_mixed_color_detection(self):
        captions = [
            "black and white dog in a park",
            "white dog running",
            "black dog sleeping",
            "brown dog under a tree",
            "tan dog playing"
        ]
        result = analyze_captions(captions)
        self.assertEqual(result, "")

    def test_breed_color_detection(self):
        captions = [
            "black affenpinscher in a park",
            "black airedale running",
            "affenpinscher sleeping",
            "black great dane under a tree",
            "black dog playing"
        ]
        result = analyze_captions(captions)
        self.assertEqual(result, "black")

# Run tests (from src directory): python -m unittest captions.captions_test
