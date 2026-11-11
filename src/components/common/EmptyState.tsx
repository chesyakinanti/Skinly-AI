import React from 'react';
import { Button } from './Button';
import { Inbox } from 'lucide-react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 sm:p-14 text-center rounded-2xl bg-white border border-[#F3E3E7] shadow-soft ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-[#F3E3E7]/70 flex items-center justify-center text-[#A4556B] mb-4">
        {icon || <Inbox className="w-8 h-8 stroke-[1.5]" aria-hidden="true" />}
      </div>
      <h3 className="text-lg font-semibold text-[#64424D] font-heading mb-2">
        {title}
      </h3>
      <p className="text-sm text-[#64424D]/70 max-w-md leading-relaxed mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
