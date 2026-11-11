'use client';

import React from 'react';
import { SkinType } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

export interface SkinTypeBadgeProps {
  type: SkinType;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
  className?: string;
}

const BADGE_COLORS: Record<
  SkinType,
  { bg: string; text: string; border: string; dot: string }
> = {
  Normal: {
    bg: 'bg-[#A9B8A2]/20',
    text: 'text-[#3E5236]',
    border: 'border-[#A9B8A2]/40',
    dot: 'bg-[#A9B8A2]',
  },
  Dry: {
    bg: 'bg-[#A9BDCC]/25',
    text: 'text-[#335064]',
    border: 'border-[#A9BDCC]/50',
    dot: 'bg-[#7A9BB3]',
  },
  Oily: {
    bg: 'bg-[#D58B9B]/20',
    text: 'text-[#8A374A]',
    border: 'border-[#D58B9B]/45',
    dot: 'bg-[#D58B9B]',
  },
  Combination: {
    bg: 'bg-[#B7A7C9]/25',
    text: 'text-[#553C6E]',
    border: 'border-[#B7A7C9]/50',
    dot: 'bg-[#9882B3]',
  },
};

export const SkinTypeBadge: React.FC<SkinTypeBadgeProps> = ({
  type,
  size = 'md',
  showDot = true,
  className = '',
}) => {
  const { t } = useLanguage();
  const colors = BADGE_COLORS[type] || BADGE_COLORS.Normal;
  const label = t.skinBadges[type] || type;

  const sizeClasses = {
    sm: 'text-[11px] px-2.5 py-1 tracking-tight',
    md: 'text-xs sm:text-[13px] px-3.5 py-1.5 tracking-tight',
    lg: 'text-sm sm:text-base px-4 py-2 font-bold tracking-tight',
  };

  return (
    <span
      className={`inline-flex items-center space-x-1.5 rounded-full font-bold leading-none border ${colors.bg} ${colors.text} ${colors.border} ${sizeClasses[size]} ${className}`}
    >
      {showDot && (
        <span
          className={`w-2 h-2 rounded-full ${colors.dot} shrink-0`}
          aria-hidden="true"
        />
      )}
      <span>{label}</span>
    </span>
  );
};
