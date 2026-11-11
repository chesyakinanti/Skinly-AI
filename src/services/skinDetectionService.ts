import { BoundingBox, DetectionResult } from '@/types';

export const skinDetectionService = {
  isConfigured(): boolean {
    const url = process.env.NEXT_PUBLIC_YOLO_API_URL;
    return Boolean(url && url.trim().length > 0);
  },

  getApiUrl(): string | null {
    return process.env.NEXT_PUBLIC_YOLO_API_URL || null;
  },

  /**
   * Send image to backend YOLO endpoint.
   * If not configured, returns clear unavailable state without fabricating predictions.
   */
  async detectRegions(imageFile: File): Promise<DetectionResult> {
    const apiUrl = this.getApiUrl();

    if (!apiUrl) {
      return {
        imageWidth: 0,
        imageHeight: 0,
        boxes: [],
        isModelConnected: false,
        statusMessage:
          'Layanan backend YOLO / Roboflow belum terhubung. Model saat ini sedang dalam proses pelatihan dataset spesifik.',
      };
    }

    try {
      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server deteksi merespons dengan status ${response.status}`);
      }

      const data = await response.json();

      // Standardize Roboflow / YOLO format
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rawBoxes: any[] = data.predictions || data.boxes || [];
      const imageWidth = data.image?.width || 640;
      const imageHeight = data.image?.height || 640;

      const boxes: BoundingBox[] = rawBoxes.map((item) => {
        const isCenterBased = item.x !== undefined && item.width !== undefined;
        // Normalize coordinates to 0..1
        let x = isCenterBased ? (item.x - item.width / 2) / imageWidth : item.x1 / imageWidth;
        let y = isCenterBased ? (item.y - item.height / 2) / imageHeight : item.y1 / imageHeight;
        let width = isCenterBased ? item.width / imageWidth : (item.x2 - item.x1) / imageWidth;
        let height = isCenterBased ? item.height / imageHeight : (item.y2 - item.y1) / imageHeight;

        // Ensure within bounds
        x = Math.max(0, Math.min(1, x));
        y = Math.max(0, Math.min(1, y));
        width = Math.max(0, Math.min(1 - x, width));
        height = Math.max(0, Math.min(1 - y, height));

        const label =
          item.class?.toLowerCase().includes('oil') || item.label?.toLowerCase().includes('oil')
            ? 'oily_region'
            : 'dry_region';

        return {
          x,
          y,
          width,
          height,
          label,
          confidence: Math.round((item.confidence || 0) * 100),
        };
      });

      return {
        imageWidth,
        imageHeight,
        boxes,
        isModelConnected: true,
        statusMessage: `Berhasil mendeteksi ${boxes.length} area kulit.`,
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Koneksi ke backend YOLO gagal.';
      return {
        imageWidth: 0,
        imageHeight: 0,
        boxes: [],
        isModelConnected: false,
        statusMessage: `Gagal memanggil endpoint deteksi YOLO: ${message}`,
      };
    }
  },

  /**
   * Reference mockup boxes strictly for showing UI appearance in developer testing.
   * Matches the visual reference mockup: 1 Oily Zone on forehead, 2 Dry Zones on cheeks.
   */
  getSampleReferenceBoxes(): BoundingBox[] {
    return [
      {
        x: 0.32,
        y: 0.16,
        width: 0.36,
        height: 0.22,
        label: 'oily_region',
        confidence: 91,
      },
      {
        x: 0.16,
        y: 0.50,
        width: 0.22,
        height: 0.22,
        label: 'dry_region',
        confidence: 87,
      },
      {
        x: 0.62,
        y: 0.50,
        width: 0.22,
        height: 0.22,
        label: 'dry_region',
        confidence: 88,
      },
    ];
  },
};
