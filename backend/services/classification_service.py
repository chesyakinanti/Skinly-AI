import os
os.environ["TF_USE_LEGACY_KERAS"] = "1"
import numpy as np
from PIL import Image
import tf_keras as keras

from backend.schemas.analysis import ClassificationResult
from backend.services.preprocessing import preprocess_for_classification

# Urutan kelas sesuai metadata.json Teachable Machine
CLASS_NAMES = ["Dry", "Oily", "Normal", "Combination"]

class SkinClassificationService:
    def __init__(self, model_path: str):
        self.model_path = model_path
        self.model = None

    def load_model(self):
        """Memuat model skin_model.h5 sekali saat startup aplikasi."""
        if not os.path.exists(self.model_path):
            raise FileNotFoundError(f"Model file tidak ditemukan di: {self.model_path}")
        
        # Load model menggunakan tf_keras (legacy Keras 2 loader)
        self.model = keras.models.load_model(self.model_path, compile=False)
        print(f"[ClassificationService] Model berhasil dimuat dari: {self.model_path}")

    def predict(self, image: Image.Image) -> ClassificationResult:
        if self.model is None:
            raise RuntimeError("Model klasifikasi belum dimuat. Panggil load_model() terlebih dahulu.")

        # Preprocessing persis sesuai pipeline Teachable Machine
        input_tensor = preprocess_for_classification(image)
        
        # Eksekusi inferensi
        raw_pred = self.model.predict(input_tensor, verbose=0)
        probabilities_array = raw_pred[0]  # Array 4 float Softmax

        # Format probabilitas ke dictionary dengan nama kelas asli
        probabilities = {}
        for idx, class_name in enumerate(CLASS_NAMES):
            probabilities[class_name] = float(probabilities_array[idx])

        # Ambil kelas dengan confidence tertinggi
        best_idx = int(np.argmax(probabilities_array))
        predicted_class = CLASS_NAMES[best_idx]
        confidence = float(probabilities_array[best_idx])

        return ClassificationResult(
            predicted_class=predicted_class,
            confidence=confidence,
            probabilities=probabilities
        )
