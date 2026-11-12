'use client';

import React, { useEffect, useState } from 'react';
import { SkinType } from '@/types';

export interface ConfidenceBarProps {
  label: string;
  type?: SkinType;
  percentage: number; // 0 to 100
  colorHex?: string;
  showPercentageText?: boolean;
  className?: string;
}

const TYPE_COLORS: Record<SkinType, string> = {
  Normal: '#A9B8A2', // Sage Green (Official brand positive status)
  Dry: '#9BB5C4', // Soft Slate
  Oily: '#A4556B', // Rose Pink (Official brand primary)
  Combination: '#8F475B', // Deep Rose / Mauve
};

export const ConfidenceBar: React.FC<ConfidenceBarProps> = ({
  label,
  type,
  percentage,
  colorHex,
  showPercentageText = true,
  className = '',
}) => {
  const [fillWidth, setFillWidth] = useState(0);
  const barColor = colorHex || (type ? TYPE_COLORS[type] : '#A4556B');
  const clampedPercentage = Math.min(Math.max(Math.round(percentage), 0), 100);

  useEffect(() => {
    // Smooth animated entrance fill
    const timer = setTimeout(() => {
      setFillWidth(clampedPercentage);
    }, 120);
    return () => clearTimeout(timer);
  }, [clampedPercentage]);

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between text-xs leading-tight">
        <span className="font-semibold text-[#64424D] tracking-tight">{label}</span>
        {showPercentageText && (
          <span className="font-bold text-[#64424D]/75 tabular-nums font-mono text-xs">
            {clampedPercentage}%
          </span>
        )}
      </div>

      <div
        className="w-full h-2 rounded-full bg-[#F3E3E7] border border-[#F3E3E7] overflow-hidden"
        role="progressbar"
        aria-valuenow={clampedPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Tingkat keyakinan ${label}: ${clampedPercentage}%`}
      >
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${fillWidth}%`,
            backgroundColor: barColor,
          }}
        />
      </div>
    </div>
  );
};
