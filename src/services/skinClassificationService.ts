import type * as tfTypes from '@tensorflow/tfjs';
import { ClassificationResult, SkinType } from '@/types';
import { SKIN_TYPES_DETAIL } from '@/data/skinTypesInfo';

export interface ClassificationServiceStatus {
  isConfigured: boolean;
  modelUrl: string;
  classes: SkinType[];
}

const DEFAULT_LOCAL_MODEL_PATH = '/models/skin-model/';

export const skinClassificationService = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _cachedModel: null as any,
  _cachedLabels: ['Dry', 'Oily', 'Normal', 'Combination'] as string[],
  _cachedImageSize: 224,
  _tf: null as typeof tfTypes | null,

  getStatus(): ClassificationServiceStatus {
    const customUrl = process.env.NEXT_PUBLIC_TEACHABLE_MACHINE_URL;
    const modelUrl = customUrl && customUrl.trim().length > 0 ? customUrl : DEFAULT_LOCAL_MODEL_PATH;
    const normalizedUrl = modelUrl.endsWith('/') ? modelUrl : `${modelUrl}/`;

    return {
      isConfigured: true,
      modelUrl: normalizedUrl,
      classes: ['Normal', 'Dry', 'Oily', 'Combination'],
    };
  },

  /**
   * Lazily load TensorFlow.js module in the browser
   */
  async _getTensorflow(): Promise<typeof tfTypes> {
    if (this._tf) {
      return this._tf;
    }

    if (typeof window === 'undefined') {
      throw new Error('TensorFlow.js hanya dapat dijalankan di lingkungan peramban (client-side).');
    }

    try {
      const tf = await import('@tensorflow/tfjs');
      await tf.ready();
      this._tf = tf;
      return tf;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`Gagal menginisialisasi modul TensorFlow.js: ${msg}`);
    }
  },

  /**
   * Load model into memory (cached)
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async loadModel(): Promise<any> {
    if (this._cachedModel) {
      return this._cachedModel;
    }

    const tf = await this._getTensorflow();
    const status = this.getStatus();
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const modelURL = `${origin}${status.modelUrl}model.json`;
    const metadataURL = `${origin}${status.modelUrl}metadata.json`;

    // 1. Fetch metadata if available
    try {
      const metaRes = await fetch(metadataURL);
      if (metaRes.ok) {
        const meta = await metaRes.json();
        if (Array.isArray(meta.labels) && meta.labels.length > 0) {
          this._cachedLabels = meta.labels;
        }
        if (typeof meta.imageSize === 'number' && meta.imageSize > 0) {
          this._cachedImageSize = meta.imageSize;
        }
      }
    } catch {
      // Fallback to default labels
    }

    // 2. Load layers model directly with TensorFlow.js HTTP loader
    try {
      const model = await tf.loadLayersModel(modelURL);
      this._cachedModel = model;
      return model;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`Gagal memuat arsitektur model TensorFlow.js: ${msg}`);
    }
  },

  /**
   * Real inference on HTMLImageElement, HTMLCanvasElement, or HTMLVideoElement
   */
  async classifyImage(
    imageElement: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement
  ): Promise<ClassificationResult> {
    try {
      const tf = await this._getTensorflow();
      const model = await this.loadModel();
      const targetSize = this._cachedImageSize || 224;

      // 1. Crop to square and resize to targetSize (224x224) via canvas
      const canvas = document.createElement('canvas');
      canvas.width = targetSize;
      canvas.height = targetSize;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Gagal menginisialisasi canvas context 2D.');
      }

      let srcW = 0;
      let srcH = 0;
      if (imageElement instanceof HTMLVideoElement) {
        srcW = imageElement.videoWidth;
        srcH = imageElement.videoHeight;
      } else if (imageElement instanceof HTMLImageElement) {
        srcW = imageElement.naturalWidth || imageElement.width;
        srcH = imageElement.naturalHeight || imageElement.height;
      } else {
        srcW = imageElement.width;
        srcH = imageElement.height;
      }

      if (srcW === 0 || srcH === 0) {
        throw new Error('Dimensi foto tidak valid atau belum selesai dimuat.');
      }

      const minDim = Math.min(srcW, srcH);
      const sx = (srcW - minDim) / 2;
      const sy = (srcH - minDim) / 2;

      ctx.drawImage(imageElement, sx, sy, minDim, minDim, 0, 0, targetSize, targetSize);

      // 2. Preprocess: fromPixels -> expandDims -> normalize to [-1, 1]
      // Teachable Machine uses: (x / 127) - 1 or (x / 127.5) - 1
      const predictionTensor = tf.tidy(() => {
        const pixels = tf.browser.fromPixels(canvas);
        const batched = pixels.expandDims(0);
        const normalized = batched.toFloat().div(tf.scalar(127.0)).sub(tf.scalar(1.0));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const output = model.predict(normalized) as any;
        return output;
      });

      const probabilitiesData = await predictionTensor.data();
      predictionTensor.dispose();

      // 3. Map predictions to classes
      const labels = this._cachedLabels && this._cachedLabels.length > 0
        ? this._cachedLabels
        : ['Dry', 'Oily', 'Normal', 'Combination'];

      const supported: SkinType[] = ['Normal', 'Dry', 'Oily', 'Combination'];
      let topClass: SkinType = 'Normal';
      let highestProb = -1;

      const probabilities = supported.map((type) => {
        const labelIndex = labels.findIndex(
          (l) => l.toLowerCase().trim() === type.toLowerCase().trim()
        );
        const rawProb =
          labelIndex >= 0 && labelIndex < probabilitiesData.length
            ? probabilitiesData[labelIndex]
            : 0;
        const prob = Math.round(rawProb * 100);

        if (prob > highestProb) {
          highestProb = prob;
          topClass = type;
        }

        return {
          type,
          percentage: prob,
          color: SKIN_TYPES_DETAIL[type].color,
        };
      });

      return {
        predictedType: topClass,
        confidence: highestProb,
        probabilities,
        educationalNotes: SKIN_TYPES_DETAIL[topClass].summary,
        isFixtureMode: false,
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Gagal memproses inferensi model.';
      throw new Error(`Klasifikasi Teachable Machine: ${message}`);
    }
  },

  /**
   * Test fixture mode for developer reference preview
   */
  getFixturePreview(type: SkinType = 'Combination'): ClassificationResult {
    const config = SKIN_TYPES_DETAIL[type];
    const probs = (['Normal', 'Dry', 'Oily', 'Combination'] as SkinType[]).map((t) => ({
      type: t,
      percentage: t === type ? 92 : t === 'Normal' ? 4 : t === 'Oily' ? 2 : 2,
      color: SKIN_TYPES_DETAIL[t].color,
    }));

    return {
      predictedType: type,
      confidence: 92,
      probabilities: probs,
      educationalNotes: config.summary,
      isFixtureMode: true,
    };
  },
};
