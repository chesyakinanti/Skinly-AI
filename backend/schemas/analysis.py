from typing import Dict, List
from pydantic import BaseModel, Field

class ClassificationResult(BaseModel):
    predicted_class: str = Field(..., description="Kelas tipe kulit dengan probabilitas tertinggi: Dry, Oily, Normal, atau Combination")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Tingkat keyakinan model terhadap kelas prediksi")
    probabilities: Dict[str, float] = Field(..., description="Probabilitas untuk seluruh 4 kelas tipe kulit")

class DetectionBox(BaseModel):
    class_name: str = Field(..., description="Nama kelas deteksi: dry_region atau oily_region")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Tingkat keyakinan deteksi")
    x1: float = Field(..., description="Koordinat x kiri atas bounding box")
    y1: float = Field(..., description="Koordinat y kiri atas bounding box")
    x2: float = Field(..., description="Koordinat x kanan bawah bounding box")
    y2: float = Field(..., description="Koordinat y kanan bawah bounding box")

class DetectionResult(BaseModel):
    image_width: int = Field(..., description="Lebar gambar asli dalam piksel")
    image_height: int = Field(..., description="Tinggi gambar asli dalam piksel")
    total_detections: int = Field(..., description="Jumlah total area yang terdeteksi")
    detections: List[DetectionBox] = Field(default_factory=list, description="Daftar bounding box area yang terdeteksi")

class UnifiedAnalysisResponse(BaseModel):
    success: bool = True
    classification: ClassificationResult
    detection: DetectionResult
