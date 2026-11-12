import { ClassificationResult, BoundingBox, SkinType } from '@/types';

export interface SpeechPlayOptions {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: unknown) => void;
  onPause?: () => void;
  onResume?: () => void;
  rate?: number;
  pitch?: number;
  language?: string;
}

export interface SpeechScriptResult {
  displayTranscript: string;
  spokenText: string;
}

/**
 * Generate natural, educational Indonesian/English speech script based strictly on actual analysis data.
 * Returns both a clean UI display transcript and a phonetically spaced spoken text for TTS.
 */
export function generateSpeechScript(
  classification: ClassificationResult,
  boxes: BoundingBox[] = [],
  language: 'id' | 'en' = 'id'
): SpeechScriptResult {
  const skinType: SkinType = classification.predictedType;
  const hasDryBox = boxes.some((b) => b.label === 'dry_region');
  const hasOilyBox = boxes.some((b) => b.label === 'oily_region');

  if (language === 'id') {
    let introSpoken = '';
    let introDisplay = '';
    let zoneSpoken = '';
    let zoneDisplay = '';
    let ingredientsSpoken = '';
    let ingredientsDisplay = '';
    let closingSpoken = '';
    let closingDisplay = '';

    switch (skinType) {
      case 'Dry':
        introDisplay = 'Halo! Berdasarkan hasil analisis Skinly AI, jenis kulit kamu cenderung kering.';
        introSpoken = 'Halo! Berdasarkan hasil analisis Skinly AI, jenis kulit kamu cenderung kering.';

        if (hasDryBox) {
          zoneDisplay = ' Pemindaian visual mendeteksi area kering yang membutuhkan hidrasi ekstra.';
          zoneSpoken = ' Pemindaian visual juga mendeteksi adanya zona kering yang memerlukan hidrasi ekstra.';
        }

        ingredientsDisplay =
          'Untuk membantu menjaga kelembapan kulit, kamu bisa mempertimbangkan kandungan Hyaluronic Acid, Ceramide, dan Glycerin. Hyaluronic Acid membantu menghidrasi kulit secara mendalam, Ceramide memperkuat lapisan skin barrier, dan Glycerin mengunci kelembapan kulit.';
        ingredientsSpoken =
          'Untuk membantu menjaga kelembapan kulit, kamu bisa mempertimbangkan kandungan Hyaluronic Acid, Ceramide, dan Glycerin. Hyaluronic Acid membantu menghidrasi kulit secara mendalam. Ceramide membantu menjaga lapisan pelindung kulit atau skin barrier. Sementara itu, Glycerin membantu mempertahankan kelembapan kulit.';

        closingDisplay = 'Gunakan pelembap yang kaya nutrisi dan lindungi selalu dengan sunscreen secara rutin.';
        closingSpoken = 'Jangan lupa gunakan pelembap dan sunscreen secara rutin setiap hari, ya!';
        break;

      case 'Oily':
        introDisplay = 'Halo! Berdasarkan hasil analisis Skinly AI, jenis kulit kamu cenderung berminyak.';
        introSpoken = 'Halo! Berdasarkan hasil analisis Skinly AI, jenis kulit kamu cenderung berminyak.';

        if (hasOilyBox) {
          zoneDisplay = ' Pemindaian visual mendeteksi zona berminyak dengan produksi sebum aktif.';
          zoneSpoken = ' Pemindaian visual juga mendeteksi adanya zona berminyak dengan produksi sebum aktif.';
        }

        ingredientsDisplay =
          'Untuk merawat kulit berminyak, pertimbangkan kandungan Niacinamide untuk membantu mengontrol minyak berlebih, dan Salicylic Acid untuk membersihkan pori-pori.';
        ingredientsSpoken =
          'Untuk membantu merawat kulit berminyak, kamu bisa mempertimbangkan kandungan Niacinamide dan Salicylic Acid. Niacinamide membantu mengontrol produksi minyak berlebih. Sedangkan Salicylic Acid membantu membersihkan pori-pori agar tidak tersumbat.';

        closingDisplay = 'Pilihlah pelembap ringan berbahan dasar air atau gel, serta sunscreen dengan hasil akhir matte.';
        closingSpoken = 'Gunakan pelembap ringan berbahan dasar air atau gel, dan jangan lupa selalu gunakan sunscreen setiap pagi, ya!';
        break;

      case 'Combination':
        introDisplay = 'Halo! Berdasarkan hasil analisis Skinly AI, jenis kulit kamu cenderung kombinasi.';
        introSpoken = 'Halo! Berdasarkan hasil analisis Skinly AI, jenis kulit kamu cenderung kombinasi.';

        if (hasDryBox && hasOilyBox) {
          zoneDisplay = ' Terdeteksi kombinasi zona berminyak dan zona kering di area wajah.';
          zoneSpoken = ' Pada pemindaian visual, terdeteksi kombinasi area berminyak dan area kering di wajah kamu.';
        } else if (hasDryBox) {
          zoneDisplay = ' Terdeteksi zona kering yang memerlukan perhatian kelembapan.';
          zoneSpoken = ' Pemindaian visual juga menemukan beberapa area kering yang memerlukan kelembapan.';
        } else if (hasOilyBox) {
          zoneDisplay = ' Terdeteksi zona berminyak pada area T wajah.';
          zoneSpoken = ' Pemindaian visual juga menemukan beberapa area yang lebih berminyak.';
        }

        ingredientsDisplay =
          'Kamu bisa mempertimbangkan kandungan Niacinamide untuk menyeimbangkan area berminyak dan Hyaluronic Acid untuk menjaga kelembapan pada area kering.';
        ingredientsSpoken =
          'Kamu bisa mempertimbangkan kandungan Niacinamide untuk menyeimbangkan area yang berminyak, dan Hyaluronic Acid untuk menjaga hidrasi pada area yang kering.';

        closingDisplay = 'Gunakan perawatan yang menyeimbangkan hidrasi tanpa menyumbat pori-pori, serta tabir surya setiap hari.';
        closingSpoken = 'Fokuskan perawatan yang menyeimbangkan kelembapan kulit, dan lindungi wajah dengan sunscreen secara teratur, ya!';
        break;

      case 'Normal':
      default:
        introDisplay = 'Halo! Berdasarkan hasil analisis Skinly AI, jenis kulit kamu berada dalam kondisi normal dan seimbang.';
        introSpoken = 'Halo! Berdasarkan hasil analisis Skinly AI, jenis kulit kamu berada dalam kondisi cenderung normal dan seimbang.';

        ingredientsDisplay =
          'Pertahankan kesehatan kulit kamu dengan kandungan hidrasi lembut seperti Hyaluronic Acid dan Ceramide untuk merawat barrier kulit.';
        ingredientsSpoken =
          'Pertahankan kesehatan kulit kamu dengan bahan hidrasi yang lembut, seperti Hyaluronic Acid dan Ceramide, untuk merawat lapisan pelindung kulit.';

        closingDisplay = 'Tetap jaga kelembapan kulit secara konsisten dan gunakan tabir surya minimal SPF 30.';
        closingSpoken = 'Tetap rawat kelembapan kulit secara konsisten, dan jangan lupa gunakan sunscreen setiap hari, ya!';
        break;
    }

    const displayTranscript = `${introDisplay}${zoneDisplay} ${ingredientsDisplay} ${closingDisplay} Informasi ini bersifat edukasi perawatan kulit dan bukan diagnosis medis.`;
    const spokenText = `${introSpoken}${zoneSpoken} ${ingredientsSpoken} ${closingSpoken}`;

    return { displayTranscript, spokenText };
  }

  // English Speech Script
  let introEn = `Hello! Based on the Skinly AI analysis, your skin tends to be ${skinType.toLowerCase()}.`;
  let zoneEn = '';
  if (hasDryBox && hasOilyBox) {
    zoneEn = ' Visual scanning detected both oily and dry zones across your face.';
  } else if (hasDryBox) {
    zoneEn = ' Visual scanning noted dry zones that benefit from barrier hydration.';
  } else if (hasOilyBox) {
    zoneEn = ' Visual scanning detected oily zones with active sebum production.';
  }

  let ingredientEn = '';
  let closingEn = 'Always complete your morning routine with sunscreen.';
  if (skinType === 'Dry') {
    ingredientEn =
      ' Consider ingredients like Hyaluronic Acid for deep hydration, Ceramide for barrier support, and Glycerin to retain moisture.';
  } else if (skinType === 'Oily') {
    ingredientEn =
      ' Consider Niacinamide to manage excess oil and Salicylic Acid to keep pores clean.';
  } else if (skinType === 'Combination') {
    ingredientEn =
      ' Consider Niacinamide for sebum-prone zones and Hyaluronic Acid to keep drier areas hydrated.';
  } else {
    ingredientEn =
      ' Maintain your balanced skin barrier using Hyaluronic Acid and gentle daily moisturizers.';
  }

  const displayTranscript = `${introEn}${zoneEn}${ingredientEn} ${closingEn} This information is for general skincare education and is not a medical diagnosis.`;
  const spokenText = `${introEn}${zoneEn}${ingredientEn} ${closingEn}`;

  return { displayTranscript, spokenText };
}

/**
 * Backwards-compatible helper returning the display transcript string.
 */
export function generateSpeechText(
  classification: ClassificationResult,
  boxes: BoundingBox[] = [],
  language: 'id' | 'en' = 'id'
): string {
  return generateSpeechScript(classification, boxes, language).displayTranscript;
}

const INDONESIAN_FEMALE_KEYWORDS = [
  'gadis',
  'google bahasa indonesia',
  'damayanti',
  'ayu',
  'wita',
  'laila',
  'siti',
  'dewi',
  'female',
  'wanita',
  'perempuan',
  'natural',
  'catherine',
  'clara',
  'yuna',
];

const MALE_VOICE_KEYWORDS = [
  'andika',
  'male',
  'pria',
  'laki',
  'david',
  'george',
  'mark',
  'paul',
  'james',
  'richard',
  'daniel',
  'thomas',
  'alex',
  'fred',
  'bruce',
  'junior',
  'ralph',
  'albert',
  'stefan',
  'id-id-male',
  'id_id_male',
  'id-male',
  'id_male',
];

export function isFemaleVoice(voice: { name?: string; voiceURI?: string }): boolean {
  const name = (voice.name || '').toLowerCase();
  const uri = (voice.voiceURI || '').toLowerCase();
  const hasFemaleKeyword = INDONESIAN_FEMALE_KEYWORDS.some(
    (kw) => name.includes(kw) || uri.includes(kw)
  );
  const hasMaleKeyword = MALE_VOICE_KEYWORDS.some(
    (kw) => name.includes(kw) || uri.includes(kw)
  );
  return hasFemaleKeyword && !hasMaleKeyword;
}

export function isMaleVoice(voice: { name?: string; voiceURI?: string }): boolean {
  const name = (voice.name || '').toLowerCase();
  const uri = (voice.voiceURI || '').toLowerCase();
  return MALE_VOICE_KEYWORDS.some((kw) => name.includes(kw) || uri.includes(kw));
}

/**
 * Instantaneous, synchronous Indonesian female voice selection:
 * 1. Checks voices for id-ID female voices (e.g. Gadis, Google Bahasa Indonesia, Damayanti).
 * 2. Checks non-male Indonesian voices.
 * 3. Never returns male voice.
 * 4. Returns null immediately if unavailable (no loops, no delays).
 */
export function selectIndonesianFemaleVoice(
  voices: SpeechSynthesisVoice[],
  targetLang: string = 'id-ID'
): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  const langCode = targetLang.toLowerCase().replace('_', '-');
  const isId = langCode.startsWith('id') || langCode.includes('indonesia');

  if (isId) {
    const idVoices = voices.filter((v) => {
      const l = (v.lang || '').toLowerCase().replace('_', '-');
      const n = (v.name || '').toLowerCase();
      return (
        l.startsWith('id') ||
        l.includes('indonesia') ||
        n.includes('indonesia') ||
        n.includes('bahasa indonesia')
      );
    });

    if (idVoices.length > 0) {
      // 1. Explicit female Indonesian voice
      const idFemale = idVoices.find((v) => isFemaleVoice(v));
      if (idFemale) return idFemale;

      // 2. Non-male Indonesian voice
      const idNonMale = idVoices.find((v) => !isMaleVoice(v));
      if (idNonMale) return idNonMale;

      // 3. Strict: If only male voices exist (like Microsoft Andika), reject completely
      return null;
    }

    return null;
  }

  // Non-Indonesian target language
  const langVoices = voices.filter((v) => {
    const l = (v.lang || '').toLowerCase().replace('_', '-');
    return l.startsWith(langCode.slice(0, 2));
  });
  return langVoices.find((v) => isFemaleVoice(v)) || langVoices.find((v) => !isMaleVoice(v)) || null;
}

export const selectFemaleVoice = selectIndonesianFemaleVoice;
export const selectIndonesianVoice = selectIndonesianFemaleVoice;

class SpeechService {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isMuted: boolean = false;

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  }

  public getBestVoice(targetLang: string = 'id-ID'): SpeechSynthesisVoice | null {
    if (!this.isSupported()) return null;
    const voices = window.speechSynthesis.getVoices() || [];
    return selectIndonesianFemaleVoice(voices, targetLang);
  }

  /**
   * Speak text using Web Speech API with natural female Indonesian parameters.
   */
  public speak(text: string, options: SpeechPlayOptions = {}): boolean {
    if (!this.isSupported()) {
      options.onError?.(new Error('Web Speech API tidak didukung di peramban ini.'));
      return false;
    }

    this.stop();

    if (this.isMuted) return false;

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = options.language || 'id-ID';
      utterance.rate = options.rate ?? 0.92;
      utterance.pitch = options.pitch ?? 1.08;
      utterance.volume = 1.0;

      const chosenVoice = this.getBestVoice(utterance.lang);
      if (chosenVoice) {
        utterance.voice = chosenVoice;
      }

      utterance.onstart = () => {
        options.onStart?.();
      };

      utterance.onend = () => {
        this.currentUtterance = null;
        options.onEnd?.();
      };

      utterance.onerror = (event) => {
        if (event.error !== 'interrupted' && event.error !== 'canceled') {
          options.onError?.(event);
        }
        this.currentUtterance = null;
      };

      utterance.onpause = () => {
        options.onPause?.();
      };

      utterance.onresume = () => {
        options.onResume?.();
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (err) {
      options.onError?.(err);
      this.currentUtterance = null;
      return false;
    }
  }

  public speakSampleTest(options: SpeechPlayOptions = {}): boolean {
    const samplePhrase =
      options.language === 'en-US' || options.language === 'en'
        ? 'Hello! I am Skinly AI. I will help you understand your skin analysis results and provide information about suitable skincare ingredients.'
        : 'Halo! Saya Skinly AI. Saya akan membantu kamu memahami hasil analisis kulit dan memberikan informasi mengenai kandungan skincare yang sesuai.';

    return this.speak(samplePhrase, {
      ...options,
      language: options.language || 'id-ID',
    });
  }

  public pause(): void {
    if (this.isSupported() && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
    }
  }

  public resume(): void {
    if (this.isSupported() && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  }

  public stop(): void {
    if (this.isSupported()) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore synthesis cancel errors
      }
    }
    this.currentUtterance = null;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (muted) {
      this.stop();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }
}

export const speechService = new SpeechService();
