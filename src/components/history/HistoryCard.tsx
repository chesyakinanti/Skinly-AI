'use client';

import React from 'react';
import { HistoryRecord } from '@/types';
import { SkinTypeBadge } from '@/components/analysis/SkinTypeBadge';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Calendar, Trash2, Eye } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface HistoryCardProps {
  record: HistoryRecord;
  onViewDetails: (record: HistoryRecord) => void;
  onDelete: (id: string) => void;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({
  record,
  onViewDetails,
  onDelete,
}) => {
  const { t } = useLanguage();

  return (
    <Card className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 hover:shadow-card hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center space-x-4">
        {/* Thumbnail */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#FCF8F6] border border-[#F3E3E7] shrink-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={record.imageThumbnail}
            alt="Facial analysis thumbnail"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2 text-xs text-[#64424D]/60">
            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{record.formattedDate}</span>
          </div>

          <div className="flex items-center space-x-2">
            {record.predictedSkinType ? (
              <SkinTypeBadge type={record.predictedSkinType} size="md" />
            ) : (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FCF8F6] text-[#64424D] border border-[#F3E3E7]">
                {t.history.areaOnly}
              </span>
            )}

            {record.confidence && (
              <span className="text-xs font-semibold text-[#A4556B] bg-[#F3E3E7] px-2 py-0.5 rounded-full">
                {record.confidence}% {t.analysis.confidenceLabel}
              </span>
            )}
          </div>

          {record.notes && (
            <p className="text-xs text-[#64424D]/75 line-clamp-1">
              {record.notes}
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2 self-end sm:self-center">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onViewDetails(record)}
          leftIcon={<Eye className="w-3.5 h-3.5" aria-hidden="true" />}
        >
          {t.history.viewDetailsBtn}
        </Button>
        <button
          type="button"
          onClick={() => onDelete(record.id)}
          className="p-2 rounded-full text-[#64424D]/60 hover:text-[#8A374A] hover:bg-[#D58B9B]/15 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A4556B]"
          aria-label={t.history.deleteAria}
        >
          <Trash2 className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </Card>
  );
};
