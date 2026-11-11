import os
from typing import List
from PIL import Image
from ultralytics import YOLO

from backend.schemas.analysis import DetectionBox, DetectionResult

class SkinDetectionService:
    def __init__(self, model_path: str):
        self.model_path = model_path
        self.model = None

    def load_model(self):
        """Memuat model YOLOv8 best.pt sekali saat startup aplikasi."""
        if not os.path.exists(self.model_path):
            raise FileNotFoundError(f"Model YOLOv8 tidak ditemukan di: {self.model_path}")
        
        self.model = YOLO(self.model_path)
        print(f"[DetectionService] Model YOLOv8 berhasil dimuat dari: {self.model_path}")
        print(f"[DetectionService] Model classes: {self.model.names}")

    def detect(self, image: Image.Image, conf_threshold: float = 0.25) -> DetectionResult:
        if self.model is None:
            raise RuntimeError("Model YOLOv8 belum dimuat. Panggil load_model() terlebih dahulu.")

        width, height = image.size

        # Inferensi langsung menggunakan PIL Image asli agar dimensi koordinat tetap akurat
        results = self.model.predict(
            source=image,
            conf=conf_threshold,
            verbose=False
        )

        detections: List[DetectionBox] = []

        if results and len(results) > 0:
            result = results[0]
            boxes = result.boxes
            if boxes is not None:
                for box in boxes:
                    # Ambil koordinat xyxy dalam float
                    coords = box.xyxy[0].tolist()  # [x1, y1, x2, y2]
                    conf = float(box.conf[0].item())
                    cls_id = int(box.cls[0].item())
                    
                    # Dapatkan nama kelas dari mapping model atau default
                    class_name = self.model.names.get(cls_id, f"region_{cls_id}")

                    detections.append(
                        DetectionBox(
                            class_name=class_name,
                            confidence=round(conf, 4),
                            x1=round(coords[0], 2),
                            y1=round(coords[1], 2),
                            x2=round(coords[2], 2),
                            y2=round(coords[3], 2)
                        )
                    )

        return DetectionResult(
            image_width=width,
            image_height=height,
            total_detections=len(detections),
            detections=detections
        )
