'use client';

import React from 'react';
import { BoundingBox, ClassificationResult, SkinType } from '@/types';
import {
  BarChart3,
  Sparkles,
  Crosshair,
  Check,
  AlertTriangle,
  Layers,
  HeartHandshake,
} from 'lucide-react';
import { ConfidenceBar } from './ConfidenceBar';
import { SkinlyVoiceAssistant } from '@/components/voice/SkinlyVoiceAssistant';
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
      {/* Header Bar - Note: 'Foto Baru' button successfully removed from top right */}
      <div className="flex items-center space-x-2 text-sm font-bold text-[#64424D] pb-0.5">
        <BarChart3 className="w-4 h-4 text-[#A4556B]" aria-hidden="true" />
        <span>{language === 'id' ? 'Hasil Analisis Kulit' : 'Skin Analysis Result'}</span>
      </div>

      {/* Skinly AI Voice Assistant Component (Refined Brand Colors) */}
      <SkinlyVoiceAssistant classification={classification} boxes={boxes} />

      {/* Model Status Notice (if not connected in environment) */}
      {!isModelConnected && (
        <div className="rounded-2xl p-3.5 bg-amber-50/70 border border-amber-200/80 text-xs text-[#64424D] space-y-1">
          <div className="flex items-center space-x-1.5 font-bold text-amber-800">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
            <span>
              {language === 'id'
                ? 'Mode Pratinjau Desain / Testing Fixture'
                : 'Design Preview / Testing Fixture Mode'}
            </span>
          </div>
          <p className="text-[11px] text-[#64424D]/75 leading-relaxed">
            {statusMessage ||
              (language === 'id'
                ? 'Backend model klasifikasi & YOLO belum dihubungkan pada variabel environment. Tampilan ini berfungsi sebagai pratinjau komponen antarmuka terintegrasi.'
                : 'Backend classification & YOLO models are not connected yet in environment variables. Output displayed as interface integration preview.')}
          </p>
        </div>
      )}

      {/* Consolidated Primary Analysis Panel */}
      <div className="rounded-2xl p-4 sm:p-5 bg-white border border-[#F3E3E7] shadow-[0_4px_20px_-2px_rgba(100,66,77,0.05)] space-y-4">
        {/* Section 1: Primary Skin Type */}
        <div className="flex items-start justify-between gap-3 pb-3.5 border-b border-[#F3E3E7]">
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold text-[#64424D]/70 uppercase tracking-wider block">
              {language === 'id' ? 'Tipe Kulit Utama' : 'Primary Skin Type'}
            </span>
            <p className="text-xl sm:text-2xl font-bold text-[#64424D] leading-tight">
              {skinTypeLabel}
            </p>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F3E3E7] border border-[#F3E3E7] text-xs font-bold text-[#A4556B] shrink-0">
            {classification.confidence}%
          </span>
        </div>

        {/* Section 2: 4-Class Probability Distribution */}
        {classification.probabilities && classification.probabilities.length > 0 && (
          <div className="space-y-2.5 pb-3.5 border-b border-[#F3E3E7]">
            <div className="flex items-center justify-between text-xs font-bold text-[#64424D]">
              <div className="flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-[#A4556B]" aria-hidden="true" />
                <span>{language === 'id' ? 'Probabilitas Kelas' : 'Class Probabilities'}</span>
              </div>
              <span className="text-[11px] font-mono text-[#64424D]/60 font-medium">4 Classes</span>
            </div>
            <div className="space-y-2 pt-0.5">
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

        {/* Section 3: Detected Zones Overview */}
        <div className="space-y-2 pb-3.5 border-b border-[#F3E3E7]">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-[#64424D]">
            <Crosshair className="w-3.5 h-3.5 text-[#A4556B]" aria-hidden="true" />
            <span>{language === 'id' ? 'Zona Kulit Terdeteksi' : 'Detected Zones'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {/* Dry Zone Item */}
            <div className="p-2.5 rounded-xl bg-[#FCF8F6] border border-[#F3E3E7] flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5B558] shrink-0" />
                <span className="text-xs font-semibold text-[#64424D]">
                  {language === 'id' ? 'Zona Kering' : 'Dry Zone'}
                </span>
              </div>
              <span className="text-xs font-bold text-[#64424D]/75 tabular-nums">
                {dryBoxes.length} {language === 'id' ? 'area' : dryBoxes.length === 1 ? 'area' : 'areas'}
              </span>
            </div>

            {/* Oily Zone Item */}
            <div className="p-2.5 rounded-xl bg-[#FCF8F6] border border-[#F3E3E7] flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] shrink-0" />
                <span className="text-xs font-semibold text-[#64424D]">
                  {language === 'id' ? 'Zona Berminyak' : 'Oily Zone'}
                </span>
              </div>
              <span className="text-xs font-bold text-[#64424D]/75 tabular-nums">
                {oilyBoxes.length} {language === 'id' ? 'area' : oilyBoxes.length === 1 ? 'area' : 'areas'}
              </span>
            </div>
          </div>
        </div>

        {/* Section 4: Skincare Recommendations */}
        <div className="space-y-2.5">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-[#64424D]">
            <HeartHandshake className="w-3.5 h-3.5 text-[#A4556B]" aria-hidden="true" />
            <span>{language === 'id' ? 'Rekomendasi Perawatan' : 'Skincare Recommendations'}</span>
          </div>
          <p className="text-[11px] text-[#64424D]/70 leading-relaxed">
            {recommendationSubtitle}
          </p>

          <div className="space-y-2 pt-0.5">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-xs text-[#2D2528]">
                <div className="w-4 h-4 rounded-full bg-[#A9B8A2]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#A9B8A2]" strokeWidth={2.5} />
                </div>
                <span className="leading-snug">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
