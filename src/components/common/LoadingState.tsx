import React from 'react';

export interface LoadingStateProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  title = 'Memproses Analisis Kulit...',
  subtitle = 'Menganalisis karakteristik tekstur visual dan pencahayaan foto wajah',
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl bg-white border border-[#F3E3E7] shadow-soft ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-[#F3E3E7] animate-pulse" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#A4556B] animate-spin" />
        <div className="absolute inset-3 rounded-full bg-[#F3E3E7]/60 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#A4556B]" />
        </div>
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-[#64424D] font-heading mb-1.5">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-[#64424D]/70 max-w-sm leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};
