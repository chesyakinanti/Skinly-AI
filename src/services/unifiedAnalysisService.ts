import { BoundingBox, ClassificationResult, DetectionResult, SkinRegionClass, SkinType } from '@/types';

export interface UnifiedBackendResponse {
  success: boolean;
  classification: {
    predicted_class: string;
    confidence: number;
    probabilities: Record<string, number>;
  };
  detection: {
    image_width: number;
    image_height: number;
    total_detections: number;
    detections: Array<{
      class_name: string;
      confidence: number;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
    }>;
  };
}

export interface UnifiedAnalysisOutput {
  classification: ClassificationResult;
  detection: DetectionResult;
}

const TYPE_COLORS: Record<SkinType, string> = {
  Dry: '#EAB308',
  Oily: '#38BDF8',
  Normal: '#A9B8A2',
  Combination: '#A4556B',
};

export const unifiedAnalysisService = {
  getApiUrl(): string {
    const envUrl = process.env.NEXT_PUBLIC_SKINLY_API_URL;
    if (envUrl && envUrl.trim().length > 0) {
      return envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl;
    }
    return 'http://127.0.0.1:8000';
  },

  async analyzeSkin(imageFile: File): Promise<UnifiedAnalysisOutput> {
    const baseUrl = this.getApiUrl();
    const endpoint = `${baseUrl}/api/v1/analyze`;

    const formData = new FormData();
    formData.append('file', imageFile);

    let res: Response;
    try {
      res = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`Tidak dapat terhubung ke Backend FastAPI di ${baseUrl}. Pastikan service FastAPI aktif (${msg}).`);
    }

    if (!res.ok) {
      let errorMsg = `Server backend merespons dengan status ${res.status}`;
      try {
        const errorJson = await res.json();
        if (errorJson.detail) {
          errorMsg = typeof errorJson.detail === 'string' ? errorJson.detail : JSON.stringify(errorJson.detail);
        }
      } catch {
        // Fallback to status text
      }
      throw new Error(errorMsg);
    }

    const data: UnifiedBackendResponse = await res.json();

    // 1. Process Classification
    const predictedType = data.classification.predicted_class as SkinType;
    const rawConf = data.classification.confidence;
    const confPercentage = Math.min(100, Math.max(1, Math.round(rawConf * 100)));

    const probabilities = Object.entries(data.classification.probabilities).map(([key, val]) => {
      const type = key as SkinType;
      return {
        type,
        percentage: Math.round(val * 100),
        color: TYPE_COLORS[type] || '#A4556B',
      };
    });

    const classificationResult: ClassificationResult = {
      predictedType,
      confidence: confPercentage,
      probabilities,
      educationalNotes: 'Analisis tipe kulit dieksekusi secara native melalui model MobileNetV2 Keras pada FastAPI backend.',
      isFixtureMode: false,
    };

    // 2. Process Object Detection
    const imgWidth = data.detection.image_width || 640;
    const imgHeight = data.detection.image_height || 640;

    const boxes: BoundingBox[] = (data.detection.detections || []).map((det) => {
      const x1 = Math.max(0, det.x1);
      const y1 = Math.max(0, det.y1);
      const x2 = Math.min(imgWidth, det.x2);
      const y2 = Math.min(imgHeight, det.y2);

      const normX = Math.max(0, Math.min(1, x1 / imgWidth));
      const normY = Math.max(0, Math.min(1, y1 / imgHeight));
      const normW = Math.max(0, Math.min(1 - normX, (x2 - x1) / imgWidth));
      const normH = Math.max(0, Math.min(1 - normY, (y2 - y1) / imgHeight));

      const label: SkinRegionClass = det.class_name.toLowerCase().includes('dry')
        ? 'dry_region'
        : 'oily_region';

      return {
        x: normX,
        y: normY,
        width: normW,
        height: normH,
        label,
        confidence: Math.round(det.confidence * 100),
      };
    });

    const detectionResult: DetectionResult = {
      imageWidth: imgWidth,
      imageHeight: imgHeight,
      boxes,
      isModelConnected: true,
      statusMessage: `Berhasil mendeteksi ${boxes.length} area kulit (YOLOv8 best.pt).`,
    };

    return {
      classification: classificationResult,
      detection: detectionResult,
    };
  },
};
