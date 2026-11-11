import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'blush' | 'flat' | 'interactive';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-2xl transition-all duration-300';

  const variantStyles = {
    default: 'bg-white border border-[#F3E3E7] shadow-soft hover:shadow-card p-6 sm:p-8',
    blush: 'bg-[#F3E3E7]/40 border border-[#F3E3E7] shadow-soft hover:shadow-card p-6 sm:p-8',
    flat: 'bg-white border border-[#F3E3E7] p-5 sm:p-6',
    interactive:
      'bg-white border border-[#F3E3E7] shadow-soft hover:shadow-elevated hover:-translate-y-1 active:translate-y-0 p-6 sm:p-8',
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};
