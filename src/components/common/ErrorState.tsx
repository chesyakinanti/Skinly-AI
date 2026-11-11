import React from 'react';
import { Button } from './Button';
import { AlertCircle, RotateCcw } from 'lucide-react';

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Terjadi Kendala',
  message,
  onRetry,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl bg-white border border-[#E8B77D]/40 shadow-soft ${className}`}
      role="alert"
    >
      <div className="w-14 h-14 rounded-full bg-[#E8B77D]/20 flex items-center justify-center text-[#B26B2A] mb-4">
        <AlertCircle className="w-7 h-7 stroke-[1.75]" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-[#64424D] font-heading mb-2">
        {title}
      </h3>
      <p className="text-sm text-[#64424D]/80 max-w-md leading-relaxed mb-6">
        {message}
      </p>
      {onRetry && (
        <Button
          variant="outline"
          onClick={onRetry}
          leftIcon={<RotateCcw className="w-4 h-4" aria-hidden="true" />}
        >
          Coba Lagi
        </Button>
      )}
    </div>
  );
};
