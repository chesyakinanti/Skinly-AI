'use client';

import React, { useState } from 'react';
import { Ingredient } from '@/types';
import { SkinTypeBadge } from '@/components/analysis/SkinTypeBadge';
import {
  ChevronDown,
  AlertCircle,
  Sparkles,
  BookMarked,
  Check,
  CheckCircle2,
  Clock,
  Layers,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface IngredientCardProps {
  ingredient: Ingredient;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Barrier Repair': { bg: 'bg-[#A9B8A2]/20', text: 'text-[#2E4227]', border: 'border-[#A9B8A2]/40' },
  'Hydration': { bg: 'bg-[#A9BDCC]/25', text: 'text-[#254153]', border: 'border-[#A9BDCC]/50' },
  'Exfoliant': { bg: 'bg-[#D58B9B]/20', text: 'text-[#7D293C]', border: 'border-[#D58B9B]/40' },
  'Anti-Aging': { bg: 'bg-[#B7A7C9]/25', text: 'text-[#482D63]', border: 'border-[#B7A7C9]/50' },
  'Soothing': { bg: 'bg-[#E8B77D]/25', text: 'text-[#7A3F0E]', border: 'border-[#E8B77D]/50' },
  'Sun Protection': { bg: 'bg-[#F3E3E7]', text: 'text-[#A4556B]', border: 'border-[#E2C3CB]' },
};

export const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient }) => {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  const catStyle = CATEGORY_COLORS[ingredient.category] || CATEGORY_COLORS['Barrier Repair'];

  return (
    <div className="group relative rounded-3xl bg-white border border-[#F3E3E7] shadow-soft hover:shadow-card hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden">
      {/* Top Gradient Accent Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#A4556B] via-[#D58B9B] to-[#A9B8A2] transition-opacity duration-300 opacity-80 group-hover:opacity-100" />

      <div className="p-6 sm:p-7 space-y-4">
        {/* Category Badge & INCI Code */}
        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${catStyle.bg} ${catStyle.text} ${catStyle.border} shadow-xs`}
          >
            <Sparkles className="w-3 h-3 shrink-0" aria-hidden="true" />
            <span>{ingredient.categoryLabelId}</span>
          </span>
          <span className="text-[11px] text-[#64424D]/60 font-mono tracking-tight bg-[#FCF8F6] px-2 py-0.5 rounded-md border border-[#F3E3E7]">
            {ingredient.inciName}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-extrabold text-[#64424D] tracking-[-0.025em] leading-snug group-hover:text-[#A4556B] transition-colors">
          {ingredient.name}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-[13px] text-[#64424D]/85 leading-relaxed tracking-[-0.005em] line-clamp-3">
          {ingredient.description}
        </p>

        {/* Suitable Skin Types */}
        <div className="space-y-1.5 pt-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#64424D]/60 block">
            {t.knowledge.card.skinTypesMatch}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {ingredient.suitableSkinTypes.map((type) => (
              <SkinTypeBadge key={type} type={type} size="sm" showDot={false} />
            ))}
          </div>
        </div>

        {/* Core Functions with Micro Cards */}
        <div className="space-y-2 pt-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#64424D]/60 block">
            {t.knowledge.card.mainFunctions}
          </span>
          <div className="space-y-1.5">
            {ingredient.functions.slice(0, 3).map((fn, idx) => (
              <div
                key={idx}
                className="flex items-start space-x-2 p-2 rounded-xl bg-[#FCF8F6] border border-[#F3E3E7] text-xs text-[#64424D]/85 leading-relaxed tracking-[-0.005em]"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A9B8A2] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{fn}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expanded Details Drawer */}
      {expanded && (
        <div className="px-6 sm:px-7 pb-6 space-y-3.5 text-xs text-[#64424D]/85 border-t border-[#F3E3E7] pt-4 bg-gradient-to-b from-white to-[#FCF8F6]/60 animate-fadeIn">
          {/* How to use */}
          <div className="space-y-1">
            <span className="font-bold flex items-center space-x-1.5 text-[#64424D]">
              <Clock className="w-3.5 h-3.5 text-[#A4556B]" aria-hidden="true" />
              <span>{t.knowledge.card.howToUse}</span>
            </span>
            <p className="leading-relaxed bg-white p-3 rounded-2xl border border-[#F3E3E7] text-[#64424D]/85">
              {ingredient.howToUse}
            </p>
          </div>

          {/* Pairs well with */}
          <div className="space-y-1">
            <span className="font-bold flex items-center space-x-1.5 text-[#64424D]">
              <Layers className="w-3.5 h-3.5 text-[#A4556B]" aria-hidden="true" />
              <span>{t.knowledge.card.pairsWith}</span>
            </span>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {ingredient.pairWellWith.map((item, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#E2C3CB] text-[11px] font-semibold text-[#64424D] shadow-xs"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Caution alert */}
          <div className="p-3 rounded-2xl bg-[#E8B77D]/15 border border-[#E8B77D]/40 flex items-start space-x-2.5 text-[11px]">
            <AlertCircle className="w-4 h-4 text-[#8C4A0E] shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-[#64424D] leading-relaxed">
              <strong className="text-[#8C4A0E]">{t.knowledge.card.caution}</strong> {ingredient.caution}
            </p>
          </div>

          {/* Scientific Citation */}
          <div className="p-3 rounded-2xl bg-white border border-[#F3E3E7] text-[11px] space-y-1 shadow-xs">
            <div className="flex items-center space-x-1.5 font-bold text-[#A4556B]">
              <BookMarked className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.knowledge.card.journalReference}</span>
            </div>
            <p className="font-semibold text-[#64424D]">{ingredient.scientificReference.title}</p>
            <p className="text-[#64424D]/60 text-[10px]">
              {ingredient.scientificReference.journal} ({ingredient.scientificReference.year}) •{' '}
              {ingredient.scientificReference.doiOrSource}
            </p>
          </div>
        </div>
      )}

      {/* Accordion Toggle Bar */}
      <div className="p-4 bg-[#FCF8F6]/80 border-t border-[#F3E3E7] flex items-center justify-center">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center space-x-2 text-xs font-bold text-[#A4556B] hover:text-[#7D3B4E] transition-colors py-1"
          aria-expanded={expanded}
        >
          <span>{expanded ? t.knowledge.card.hideDetails : t.knowledge.card.viewDetails}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              expanded ? 'rotate-180 text-[#7D3B4E]' : 'text-[#A4556B]'
            }`}
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
};
