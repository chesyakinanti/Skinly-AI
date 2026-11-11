import os
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from PIL import Image
import numpy as np

from backend.services.classification_service import SkinClassificationService
from backend.services.detection_service import SkinDetectionService

classifier_path = os.path.join(BASE_DIR, "backend", "models", "skin_classifier", "skin_model.h5")
detector_path = os.path.join(BASE_DIR, "backend", "models", "best.pt")

print("1. Testing SkinClassificationService...")
classifier = SkinClassificationService(classifier_path)
classifier.load_model()

print("2. Testing SkinDetectionService...")
detector = SkinDetectionService(detector_path)
detector.load_model()

# Create a test image
print("3. Creating synthetic face image for inference...")
test_img = Image.new("RGB", (640, 640), color=(235, 195, 175))

print("4. Testing classification prediction...")
cls_res = classifier.predict(test_img)
print("Classification Result:")
print("Predicted Class:", cls_res.predicted_class)
print("Confidence:", cls_res.confidence)
print("Probabilities:", cls_res.probabilities)

print("\n5. Testing detection prediction...")
det_res = detector.detect(test_img)
print("Detection Result:")
print("Image width:", det_res.image_width, "height:", det_res.image_height)
print("Total detections:", det_res.total_detections)
for d in det_res.detections:
    print(f" - {d.class_name}: {d.confidence} at ({d.x1}, {d.y1}, {d.x2}, {d.y2})")

print("\nSUCCESS: Both models loaded and executed inference seamlessly!")
