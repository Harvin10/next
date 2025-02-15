'use client';

import React, { FC, ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
  bgColor?: string;
  textColor?: string;
}

const Button: FC<ButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  bgColor,
  textColor,
}) => {
  const baseStyles = 'rounded-full font-semibold transition-colors duration-300 flex items-center shadow-lg hover:shadow-xl';

  const variants = {
    primary: `bg-[#b22222] hover:bg-[#8b1a1a] text-white`,
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'bg-transparent border-2 border-[#b22222] text-[#b22222] hover:bg-[#b22222] hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const customColorStyles = {
    backgroundColor: bgColor,
    color: textColor,
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${icon ? 'justify-between px-3 flex-row gap-2' : 'justify-center'
        }`}
      style={customColorStyles}
    >
      {children}
      {icon && icon}
    </button>
  );
};

export default Button;