'use client';

import React, { FC, ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
}

const Button: FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
}) => {
  const baseStyles = 'rounded-full font-semibold transition-colors duration-300 flex items-center gap-4 shadow-lg hover:shadow-xl';

  const variants = {
    primary: 'bg-[#b22222] text-white hover:bg-[#9b1d1d]',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'bg-transparent border-2 border-[#b22222] text-[#b22222] hover:bg-[#b22222] hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
      {icon && icon}
    </button>
  );
};

export default Button;