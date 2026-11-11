from fastapi import APIRouter, File, UploadFile, HTTPException, Depends
from backend.schemas.analysis import UnifiedAnalysisResponse
from backend.services.preprocessing import load_image_from_bytes
from backend.services.classification_service import SkinClassificationService
from backend.services.detection_service import SkinDetectionService

router = APIRouter(prefix="/api/v1", tags=["Analysis"])

# Getter dependencies untuk services (akan di-inject dari main.py state)
def get_classification_service() -> SkinClassificationService:
    from backend.main import classification_service
    if classification_service is None:
        raise HTTPException(status_code=500, detail="Skin classification service belum siap.")
    return classification_service

def get_detection_service() -> SkinDetectionService:
    from backend.main import detection_service
    if detection_service is None:
        raise HTTPException(status_code=500, detail="Skin detection service belum siap.")
    return detection_service

@router.post("/analyze", response_model=UnifiedAnalysisResponse)
async def analyze_skin(
    file: UploadFile = File(..., description="Foto wajah dalam format JPG, PNG, atau WEBP"),
    classifier: SkinClassificationService = Depends(get_classification_service),
    detector: SkinDetectionService = Depends(get_detection_service)
):
    """
    Endpoint terpadu analisis kulit:
    1. Menerima 1 file foto wajah.
    2. Menjalankan model klasifikasi tipe kulit (MobileNetV2 / Teachable Machine).
    3. Menjalankan model deteksi area wajah YOLOv8 (dry_region & oily_region).
    4. Mengembalikan respons gabungan untuk frontend.
    """
    # 1. Validasi keberadaan file
    if not file or not file.filename:
        raise HTTPException(status_code=400, detail="File gambar wajib diunggah.")

    # 2. Baca isi file
    try:
        contents = await file.read()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Gagal membaca file gambar: {str(e)}")

    if len(contents) == 0:
        raise HTTPException(status_code=400, detail="File gambar yang diunggah kosong.")

    # 3. Validasi dan decode gambar menjadi PIL Image
    try:
        image = load_image_from_bytes(contents)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Format gambar tidak didukung: {str(e)}")

    # 4. Jalankan inferensi klasifikasi
    try:
        classification_result = classifier.predict(image)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Kesalahan pada inferensi klasifikasi tipe kulit: {str(e)}")

    # 5. Jalankan inferensi deteksi area YOLOv8
    try:
        detection_result = detector.detect(image)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Kesalahan pada inferensi deteksi area YOLOv8: {str(e)}")

    # 6. Kembalikan respons gabungan
    return UnifiedAnalysisResponse(
        success=True,
        classification=classification_result,
        detection=detection_result
    )
