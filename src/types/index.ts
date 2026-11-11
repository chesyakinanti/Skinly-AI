export type SkinType = 'Normal' | 'Dry' | 'Oily' | 'Combination';

export interface SkinTypeDetail {
  id: SkinType;
  labelId: string; // e.g. "Kulit Normal", "Kulit Kering", "Kulit Berminyak", "Kulit Kombinasi"
  color: string;
  badgeBg: string;
  badgeText: string;
  summary: string;
  characteristics: string[];
  recommendedRoutine: {
    step: string;
    description: string;
  }[];
  keyIngredients: string[];
  careNotice: string;
}

export interface ClassificationResult {
  predictedType: SkinType;
  confidence: number; // 0 to 100 percentage
  probabilities: {
    type: SkinType;
    percentage: number;
    color: string;
  }[];
  educationalNotes: string;
  isFixtureMode?: boolean;
}

export type SkinRegionClass = 'oily_region' | 'dry_region';

export interface BoundingBox {
  x: number; // normalized 0 to 1
  y: number;
  width: number;
  height: number;
  label: SkinRegionClass;
  confidence: number; // 0 to 100 percentage
}

export interface DetectionResult {
  imageWidth: number;
  imageHeight: number;
  boxes: BoundingBox[];
  isModelConnected: boolean;
  statusMessage: string;
}

export interface Ingredient {
  id: string;
  name: string;
  inciName: string;
  category: 'Hydration' | 'Exfoliant' | 'Soothing' | 'Anti-Aging' | 'Barrier Repair' | 'Sun Protection';
  categoryLabelId: string;
  functions: string[];
  suitableSkinTypes: SkinType[];
  description: string;
  howToUse: string;
  pairWellWith: string[];
  caution: string;
  scientificReference: {
    title: string;
    journal: string;
    year: number;
    doiOrSource: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  references?: {
    title: string;
    source: string;
  }[];
}

export interface HistoryRecord {
  id: string;
  createdAt: string; // ISO date string
  formattedDate: string;
  imageThumbnail: string; // base64 or object URL
  predictedSkinType?: SkinType;
  confidence?: number;
  detectionStatus?: 'completed' | 'pending_model' | 'not_requested';
  detectedRegionsCount?: number;
  notes?: string;
}
