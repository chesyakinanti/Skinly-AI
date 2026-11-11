'use client';

import React from 'react';
import { BoundingBox, ClassificationResult, SkinType } from '@/types';
import {
  BarChart3,
  Sparkles,
  Crosshair,
  Check,
  AlertTriangle,
  RotateCcw,
  Layers,
  HeartHandshake,
} from 'lucide-react';
import { ConfidenceBar } from './ConfidenceBar';
import { useLanguage } from '@/context/LanguageContext';

export interface UnifiedAnalysisResultProps {
  classification: ClassificationResult;
  boxes: BoundingBox[];
  isModelConnected: boolean;
  statusMessage?: string;
  onReset: () => void;
}

export const UnifiedAnalysisResult: React.FC<UnifiedAnalysisResultProps> = ({
  classification,
  boxes,
  isModelConnected,
  statusMessage,
  onReset,
}) => {
  const { language } = useLanguage();

  const dryBoxes = boxes.filter((b) => b.label === 'dry_region');
  const oilyBoxes = boxes.filter((b) => b.label === 'oily_region');

  // Format skin type label
  const skinTypeLabel = (() => {
    const type = classification.predictedType;
    if (language === 'id') {
      if (type === 'Combination') return 'Kombinasi (Kering–Berminyak)';
      if (type === 'Dry') return 'Kering (Dehidrasi)';
      if (type === 'Oily') return 'Berminyak (Sebum Berlebih)';
      return 'Normal (Keseimbangan Sehat)';
    } else {
      if (type === 'Combination') return 'Combination (Dry–Oily)';
      if (type === 'Dry') return 'Dry (Low Moisture)';
      if (type === 'Oily') return 'Oily (Excess Sebum)';
      return 'Normal (Balanced Skin)';
    }
  })();

  // Calculate object detection average confidence
  const detectionConfidence =
    boxes.length > 0
      ? Math.round(boxes.reduce((acc, curr) => acc + curr.confidence, 0) / boxes.length)
      : null;

  // Generate tailored evidence-based recommendations based strictly on detected classes
  const recommendations = (() => {
    const list: string[] = [];
    const hasDry = dryBoxes.length > 0 || classification.predictedType === 'Dry';
    const hasOily = oilyBoxes.length > 0 || classification.predictedType === 'Oily';

    if (language === 'id') {
      if (hasDry && hasOily) {
        list.push('Gunakan pembersih wajah bertekstur lembut dan berhidrasi (gentle hydrating cleanser).');
        list.push('Gunakan pelembap ringan (gel-cream) yang tidak menyumbat pori di seluruh wajah.');
        list.push('Gunakan bahan pengontrol sebum (mis. Niacinamide) pada area yang terdeteksi berminyak.');
        list.push('Lengkapi dengan tabir surya harian minimal SPF 30+ bertekstur fluid atau water-based.');
      } else if (hasDry) {
        list.push('Gunakan pembersih wajah tanpa busa keras yang menjaga integritas sawar kulit.');
        list.push('Aplikasikan pelembap kaya humektan (Hyaluronic Acid) dan emolien (Ceramide).');
        list.push('Fokuskan hidrasi intensif pada area wajah yang terdeteksi kering atau kasar.');
        list.push('Gunakan tabir surya (SPF 30+) dengan formula melembapkan setiap pagi.');
      } else if (hasOily) {
        list.push('Gunakan pembersih wajah berformula seimbang untuk mengangkat kelebihan minyak.');
        list.push('Gunakan pelembap ringan berbahan dasar air (oil-free / water-gel).');
        list.push('Gunakan bahan pengontrol minyak seperti Niacinamide atau Zinc PCA.');
        list.push('Gunakan tabir surya berlabel matte finish atau non-comedogenic (SPF 30+).');
      } else {
        list.push('Pertahankan keseimbangan alami kulit dengan pembersih ber-pH seimbang.');
        list.push('Gunakan pelembap hidrasi ringan sehari-hari.');
        list.push('Lindungi sawar kulit dari paparan radiasi UV dengan tabir surya SPF 30+ harian.');
      }
    } else {
      if (hasDry && hasOily) {
        list.push('Use a gentle, hydrating cleanser.');
        list.push('Apply a lightweight moisturizer (gel-cream).');
        list.push('Use oil-control ingredients (e.g., Niacinamide) on oily areas.');
        list.push("Don't forget sunscreen (SPF 30+).");
      } else if (hasDry) {
        list.push('Use a gentle, non-foaming hydrating cleanser.');
        list.push('Apply a rich barrier-supporting moisturizer with Ceramides.');
        list.push('Target hydrating essences on detected dry zones.');
        list.push('Finish with a moisturizing broad-spectrum SPF 30+ sunscreen.');
      } else if (hasOily) {
        list.push('Use a gentle gel cleanser that removes excess sebum.');
        list.push('Apply an oil-free, lightweight water-gel moisturizer.');
        list.push('Incorporate sebum-regulating actives like Niacinamide.');
        list.push('Apply a matte-finish, non-comedogenic SPF 30+ daily.');
      } else {
        list.push('Maintain natural skin balance with a gentle pH-balanced cleanser.');
        list.push('Apply a daily lightweight hydrating moisturizer.');
        list.push('Protect the healthy barrier with broad-spectrum SPF 30+ sunscreen.');
      }
    }
    return list;
  })();

  const recommendationSubtitle = (() => {
    if (language === 'id') {
      if (dryBoxes.length > 0 && oilyBoxes.length > 0) {
        return 'Rutinitas seimbang untuk mengontrol minyak berlebih sekaligus menjaga hidrasi area kering.';
      } else if (dryBoxes.length > 0) {
        return 'Fokus pada pemulihan hidrasi dan penguatan sawar kulit pada area yang kering.';
      } else if (oilyBoxes.length > 0) {
        return 'Fokus pada pengaturan sebum dan perlindungan tekstur ringan tanpa menyumbat pori.';
      }
      return 'Panduan perawatan harian untuk menjaga keharmonisan dan sawar alami kulit.';
    } else {
      if (dryBoxes.length > 0 && oilyBoxes.length > 0) {
        return 'A balanced routine to control excess oil and keep dry areas moisturized.';
      } else if (dryBoxes.length > 0) {
        return 'Focus on hydration recovery and barrier support for low-moisture zones.';
      } else if (oilyBoxes.length > 0) {
        return 'Focus on sebum regulation and lightweight non-comedogenic hydration.';
      }
      return 'A daily routine to preserve balanced skin barrier integrity.';
    }
  })();

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center space-x-2 text-base font-extrabold text-[#64424D]">
          <BarChart3 className="w-5 h-5 text-[#A4556B]" aria-hidden="true" />
          <span>{language === 'id' ? 'Hasil Analisis' : 'Analysis Result'}</span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#A4556B] hover:text-[#7D3B4E] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{language === 'id' ? 'Analisis Ulang' : 'New Scan'}</span>
        </button>
      </div>

      {/* Model Status Notice (Honest Architecture) */}
      {!isModelConnected && (
        <div className="rounded-2xl p-3 bg-[#E8B77D]/15 border border-[#E8B77D]/40 text-xs text-[#64424D] space-y-1">
          <div className="flex items-center space-x-1.5 font-bold text-[#8C4A0E]">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            <span>
              {language === 'id'
                ? 'Mode Pratinjau Desain / Testing Fixture'
                : 'Design Preview / Testing Fixture Mode'}
            </span>
          </div>
          <p className="text-[11px] text-[#64424D]/80 leading-relaxed">
            {statusMessage ||
              (language === 'id'
                ? 'Backend model klasifikasi & YOLO belum dihubungkan pada variabel environment. Tampilan ini berfungsi sebagai pratinjau komponen antarmuka terintegrasi.'
                : 'Backend classification & YOLO models are not connected yet in environment variables. Output displayed as interface integration preview.')}
          </p>
        </div>
      )}

      {/* Card 1: Skin Type */}
      <div className="rounded-2xl p-4 sm:p-5 bg-[#FDF2F4] border border-[#F3E3E7] shadow-xs flex items-center space-x-4">
        <div className="w-12 h-12 rounded-2xl bg-white border border-[#E9D2D8] flex items-center justify-center text-[#A4556B] shadow-xs shrink-0">
          <Sparkles className="w-6 h-6" aria-hidden="true" />
        </div>
        <div className="space-y-0.5">
          <span className="text-xs font-semibold text-[#64424D]/70 block">
            {language === 'id' ? 'Tipe Kulit' : 'Skin Type'}
          </span>
          <p className="text-lg sm:text-xl font-extrabold text-[#64424D] leading-tight">
            {skinTypeLabel}
          </p>
        </div>
      </div>

      {/* Card 1b: 4-Class Probability Distribution */}
      {classification.probabilities && classification.probabilities.length > 0 && (
        <div className="rounded-2xl p-4 sm:p-5 bg-white border border-[#F3E3E7] shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-[#64424D] uppercase tracking-wider">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4 text-[#A4556B]" aria-hidden="true" />
              <span>{language === 'id' ? 'Probabilitas 4 Kelas' : 'Class Probabilities'}</span>
            </div>
            <span className="text-[11px] font-mono text-[#64424D]/60 font-semibold">4 Classes</span>
          </div>
          <div className="space-y-2.5 pt-1">
            {classification.probabilities.map((item) => (
              <ConfidenceBar
                key={item.type}
                label={item.type}
                type={item.type}
                percentage={item.percentage}
                colorHex={item.color}
              />
            ))}
          </div>
        </div>
      )}

      {/* Card 2: Detected Zones */}
      <div className="rounded-2xl p-4 sm:p-5 bg-white border border-[#F3E3E7] shadow-xs space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-[#64424D] uppercase tracking-wider">
          <Crosshair className="w-4 h-4 text-[#A4556B]" aria-hidden="true" />
          <span>{language === 'id' ? 'Area Kulit Terdeteksi' : 'Detected Zones'}</span>
        </div>

        {/* Dry Zone Item */}
        <div className="p-3 rounded-xl bg-[#FCF8F6] border border-[#F3E3E7] flex items-center justify-between gap-3">
          <div className="flex items-start space-x-2.5">
            <span className="w-3.5 h-3.5 rounded-md bg-[#FACC15] shrink-0 mt-0.5 shadow-xs" />
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#64424D] block">
                {language === 'id' ? 'Area Kering (Dry Zone)' : 'Dry Zone'}
              </span>
              <p className="text-[11px] text-[#64424D]/70 leading-tight">
                {language === 'id'
                  ? 'Area dengan kelembapan rendah, cenderung terasa kasar.'
                  : 'Areas with low moisture, tend to feel rough or flaky.'}
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-white border border-[#F3E3E7] text-[11px] font-bold text-[#64424D] shadow-xs shrink-0">
            {dryBoxes.length} {language === 'id' ? 'area' : dryBoxes.length === 1 ? 'area' : 'areas'}
          </span>
        </div>

        {/* Oily Zone Item */}
        <div className="p-3 rounded-xl bg-[#FCF8F6] border border-[#F3E3E7] flex items-center justify-between gap-3">
          <div className="flex items-start space-x-2.5">
            <span className="w-3.5 h-3.5 rounded-md bg-[#38BDF8] shrink-0 mt-0.5 shadow-xs" />
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#64424D] block">
                {language === 'id' ? 'Area Berminyak (Oily Zone)' : 'Oily Zone'}
              </span>
              <p className="text-[11px] text-[#64424D]/70 leading-tight">
                {language === 'id'
                  ? 'Area dengan kelebihan minyak (sebum), tampak mengkilap.'
                  : 'Areas with excess oil (sebum), often look shiny.'}
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-white border border-[#F3E3E7] text-[11px] font-bold text-[#64424D] shadow-xs shrink-0">
            {oilyBoxes.length} {language === 'id' ? 'area' : oilyBoxes.length === 1 ? 'area' : 'areas'}
          </span>
        </div>
      </div>

      {/* Card 3: Model Confidence */}
      <div className="rounded-2xl p-4 sm:p-5 bg-white border border-[#F3E3E7] shadow-xs space-y-2.5">
        <div className="flex items-center space-x-2 text-xs font-bold text-[#64424D] uppercase tracking-wider">
          <Layers className="w-4 h-4 text-[#A4556B]" aria-hidden="true" />
          <span>{language === 'id' ? 'Tingkat Keyakinan Model' : 'Model Confidence'}</span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-[#F3E3E7]">
            <span className="text-[#64424D]/80">
              {language === 'id'
                ? 'Klasifikasi Tipe Kulit (Classification)'
                : 'Skin Type (Classification)'}
            </span>
            <span className="font-mono font-bold text-[#64424D]">
              {(classification.confidence / 100).toFixed(2)} ({classification.confidence}%)
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-[#64424D]/80">
              {language === 'id'
                ? 'Deteksi Area (Object Detection)'
                : 'Zone Detection (Object Detection)'}
            </span>
            <span className="font-mono font-bold text-[#64424D]">
              {detectionConfidence !== null
                ? `${(detectionConfidence / 100).toFixed(2)} (${detectionConfidence}%)`
                : language === 'id'
                ? 'Tidak ada area'
                : 'No zones detected'}
            </span>
          </div>
        </div>
      </div>

      {/* Card 4: Skincare Recommendation */}
      <div className="rounded-2xl p-4 sm:p-5 bg-[#FDF2F4] border border-[#F3E3E7] shadow-xs space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-[#64424D] uppercase tracking-wider">
          <HeartHandshake className="w-4 h-4 text-[#A4556B]" aria-hidden="true" />
          <span>{language === 'id' ? 'Rekomendasi Perawatan' : 'Skincare Recommendation'}</span>
        </div>
        <p className="text-[11px] text-[#64424D]/80 leading-relaxed font-normal">
          {recommendationSubtitle}
        </p>

        <div className="space-y-2 pt-1">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="flex items-start space-x-2.5 text-xs text-[#64424D]">
              <span className="w-4 h-4 rounded-full bg-white border border-[#E9D2D8] text-[#A4556B] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                <Check className="w-2.5 h-2.5 stroke-[2.5]" />
              </span>
              <span className="leading-snug">{rec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
