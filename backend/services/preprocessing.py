import io
from typing import Tuple
from PIL import Image
import numpy as np

def load_image_from_bytes(image_bytes: bytes) -> Image.Image:
    """
    Validasi dan muat raw bytes gambar menjadi objek PIL Image dalam format RGB.
    Mendukung format JPG, PNG, WEBP, BMP.
    """
    try:
        image = Image.open(io.BytesIO(image_bytes))
        image.load()
        # Selalu konversi ke RGB (hilangkan channel alpha atau format grayscale)
        if image.mode != "RGB":
            image = image.convert("RGB")
        return image
    except Exception as e:
        raise ValueError(f"File gambar tidak valid atau format tidak didukung: {str(e)}")

def preprocess_for_classification(
    image: Image.Image,
    target_size: Tuple[int, int] = (224, 224)
) -> np.ndarray:
    """
    Tahapan preprocessing sesuai skinClassificationService.ts Teachable Machine:
    1. Konversi RGB.
    2. Center-square crop: ambil area bujur sangkar di tengah gambar berdasarkan min(width, height).
    3. Bilinear interpolation resize ke 224x224.
    4. Normalisasi nilai piksel: (pixel / 127.0) - 1.0 -> rentang [-1.0, 1.0].
    5. Expand batch dimension menjadi shape (1, 224, 224, 3).
    """
    w, h = image.size
    crop_size = min(w, h)
    left = (w - crop_size) // 2
    top = (h - crop_size) // 2
    
    # 2. Center-square crop
    cropped = image.crop((left, top, left + crop_size, top + crop_size))
    
    # 3. Bilinear resize ke 224x224
    resized = cropped.resize(target_size, Image.Resampling.BILINEAR)
    
    # 4. Normalisasi (pixel / 127.0) - 1.0
    arr = np.array(resized, dtype=np.float32)
    normalized = (arr / 127.0) - 1.0
    
    # 5. Expand batch dimension -> (1, 224, 224, 3)
    return np.expand_dims(normalized, axis=0)
