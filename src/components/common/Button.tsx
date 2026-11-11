import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'group relative overflow-hidden inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#A4556B] to-[#8F475B] hover:from-[#8F475B] hover:to-[#7D3B4E] text-white shadow-soft hover:shadow-card hover:-translate-y-0.5 focus-visible:ring-[#A4556B]',
    secondary:
      'bg-[#F3E3E7] text-[#A4556B] hover:bg-[#EBD2D8] hover:text-[#7D3B4E] active:bg-[#E2C3CB] shadow-xs focus-visible:ring-[#A4556B]',
    outline:
      'border-2 border-[#A4556B] text-[#A4556B] bg-transparent hover:bg-[#F3E3E7]/40 active:bg-[#F3E3E7] focus-visible:ring-[#A4556B]',
    ghost:
      'text-[#64424D] bg-transparent hover:bg-[#F3E3E7]/60 hover:text-[#A4556B] active:bg-[#F3E3E7] focus-visible:ring-[#A4556B]',
  };

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 min-h-[36px]',
    md: 'text-sm px-5 py-2.5 min-h-[44px]',
    lg: 'text-base px-6 py-3 min-h-[48px]',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Specular sheen gliding animation on hover for primary buttons */}
      {variant === 'primary' && !disabled && !isLoading && (
        <span
          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-out pointer-events-none"
          aria-hidden="true"
        />
      )}

      {isLoading ? (
        <span className="flex items-center space-x-2">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Memproses...</span>
        </span>
      ) : (
        <span className="flex items-center space-x-2 relative z-10">
          {leftIcon && <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">{rightIcon}</span>}
        </span>
      )}
    </button>
  );
};
