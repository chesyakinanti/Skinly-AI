import os
import sys
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Pastikan root direktori project ada di sys.path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from backend.services.classification_service import SkinClassificationService
from backend.services.detection_service import SkinDetectionService
from backend.routers import analysis

# Lokasi model
CLASSIFIER_MODEL_PATH = os.path.join(BASE_DIR, "backend", "models", "skin_classifier", "skin_model.h5")
DETECTOR_MODEL_PATH = os.path.join(BASE_DIR, "backend", "models", "best.pt")

# Global service instances (dimuat sekali saat startup)
classification_service: SkinClassificationService = None
detection_service: SkinDetectionService = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global classification_service, detection_service
    print("[Skinly Backend] Memulai inisialisasi AI Models...")
    
    # 1. Inisialisasi dan load model klasifikasi
    classification_service = SkinClassificationService(CLASSIFIER_MODEL_PATH)
    classification_service.load_model()
    
    # 2. Inisialisasi dan load model deteksi YOLOv8
    detection_service = SkinDetectionService(DETECTOR_MODEL_PATH)
    detection_service.load_model()
    
    print("[Skinly Backend] Seluruh model AI berhasil dimuat dan siap menerima request.")
    yield
    print("[Skinly Backend] Mematikan backend service.")

app = FastAPI(
    title="Skinly AI - Unified Backend Service",
    description="Unified API untuk Klasifikasi Tipe Kulit dan Deteksi Area Wajah",
    version="1.0.0",
    lifespan=lifespan
)

# Konfigurasi CORS agar frontend Next.js dapat mengakses API secara leluasa
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Mengizinkan semua origin untuk kemudahan dev (termasuk localhost:3000)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Daftarkan Router
app.include_router(analysis.router)

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "Skinly AI Unified Backend",
        "version": "1.0.0",
        "endpoints": {
            "analysis": "/api/v1/analyze",
            "health": "/health",
            "docs": "/docs"
        }
    }

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "models_loaded": {
            "skin_classifier": classification_service is not None and classification_service.model is not None,
            "yolov8_detector": detection_service is not None and detection_service.model is not None
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
