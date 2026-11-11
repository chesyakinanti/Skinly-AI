'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ClassificationResult } from '@/types';
import { getSkinTypeDetail } from '@/data/skinTypesInfo';
import { SkinTypeBadge } from './SkinTypeBadge';
import { ConfidenceBar } from './ConfidenceBar';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import {
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface AnalysisResultProps {
  result: ClassificationResult;
  imageThumbnail: string;
  onReset: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({
  result,
  imageThumbnail,
  onReset,
}) => {
  const { language, t } = useLanguage();
  const detail = getSkinTypeDetail(result.predictedType, language);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Fixture Mode Notice if applicable */}
      {result.isFixtureMode && (
        <div className="rounded-2xl p-4 bg-[#E8B77D]/20 border border-[#E8B77D]/50 flex items-start space-x-3 text-xs text-[#64424D]">
          <AlertTriangle className="w-5 h-5 text-[#B26B2A] shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <p className="font-semibold text-[#8C4A0E]">
              {t.analysis.fixtureNoticeTitle}
            </p>
            <p>
              {t.analysis.fixtureNoticeDesc}
            </p>
          </div>
        </div>
      )}

      {/* Top Banner: Predicted Type & Confidence */}
      <Card className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F3E3E7]">
          <div>
            <div className="text-xs uppercase tracking-wider text-[#64424D]/60 font-semibold mb-1">
              {t.analysis.resultTitle}
            </div>
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#64424D] font-heading">
                {detail.labelId}
              </h2>
              <SkinTypeBadge type={result.predictedType} size="lg" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="primary"
              size="sm"
              onClick={onReset}
              leftIcon={<Sparkles className="w-4 h-4" aria-hidden="true" />}
            >
              {t.analysis.analyzeNew}
            </Button>
          </div>
        </div>

        {/* Confidence Breakdown across all 4 classes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-[#64424D]">
            <span>{t.analysis.modelConfidence}</span>
            <span className="text-[#A4556B] font-bold">
              {result.confidence}% {t.analysis.confidenceLabel}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.probabilities.map((item) => (
              <ConfidenceBar
                key={item.type}
                label={getSkinTypeDetail(item.type, language).labelId}
                type={item.type}
                percentage={item.percentage}
                colorHex={item.color}
              />
            ))}
          </div>
        </div>
      </Card>

      {/* Educational Explanation & Routine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Skin Type Summary & Characteristics */}
        <div className="lg:col-span-6 space-y-6">
          <Card>
            <h3 className="text-lg font-bold text-[#64424D] font-heading mb-3">
              {t.analysis.characteristicsTitle} {detail.labelId}
            </h3>
            <p className="text-sm text-[#64424D]/80 leading-relaxed mb-4">
              {detail.summary}
            </p>

            <div className="space-y-2 pt-2 border-t border-[#F3E3E7]">
              <p className="text-xs font-semibold text-[#64424D] uppercase tracking-wider mb-2">
                {t.analysis.keyFeaturesTitle}
              </p>
              {detail.characteristics.map((char, index) => (
                <div key={index} className="flex items-start space-x-2 text-xs sm:text-sm text-[#64424D]/85">
                  <CheckCircle2 className="w-4 h-4 text-[#A9B8A2] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{char}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[#F3E3E7]/40 border border-[#F3E3E7] text-xs text-[#64424D]">
              <span className="font-semibold block mb-1 text-[#A4556B]">
                {t.analysis.specialNoticeTitle}
              </span>
              <p className="leading-relaxed">{detail.careNotice}</p>
            </div>
          </Card>
        </div>

        {/* Right: Recommended Routine & Key Ingredients */}
        <div className="lg:col-span-6 space-y-6">
          <Card>
            <h3 className="text-lg font-bold text-[#64424D] font-heading mb-3">
              {t.analysis.routineTitle}
            </h3>
            <div className="space-y-3">
              {detail.recommendedRoutine.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#F3E3E7] text-xs sm:text-sm space-y-1 hover:-translate-y-0.5 hover:bg-white hover:shadow-soft transition-all duration-200"
                >
                  <span className="font-bold text-[#A4556B] block">
                    {idx + 1}. {step.step}
                  </span>
                  <p className="text-[#64424D]/80 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#F3E3E7]">
              <p className="text-xs font-bold text-[#64424D] uppercase tracking-wider mb-2.5">
                {t.analysis.keyIngredientsTitle}
              </p>
              <div className="flex flex-wrap gap-2">
                {detail.keyIngredients.map((ing, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-[#E2C3CB] text-xs font-semibold text-[#64424D] shadow-xs hover:border-[#A4556B] hover:scale-105 transition-all cursor-default"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-2">
              <Link
                href="/knowledge"
                className="group inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-[#A4556B] hover:text-[#7D3B4E] transition-all"
              >
                <BookOpen className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                <span>{t.analysis.learnMoreInKnowledge}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
