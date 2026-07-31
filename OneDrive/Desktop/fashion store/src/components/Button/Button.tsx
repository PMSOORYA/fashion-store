import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-sans uppercase tracking-[0.18em] font-medium transition-all duration-300 rounded-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#111111]';
  
  const sizeStyles = {
    sm: 'text-xs px-4 py-2 text-[11px]',
    md: 'text-xs px-6 py-3.5 text-[12px]',
    lg: 'text-sm px-9 py-4 text-[13px] font-semibold',
  };

  const variantStyles = {
    primary: 'bg-[#111111] text-[#FFFFFF] hover:bg-[#2B2B2B] active:bg-[#000000] border border-[#111111]',
    secondary: 'bg-transparent text-[#111111] border border-[#111111] hover:bg-[#111111] hover:text-[#FFFFFF]',
    accent: 'bg-[#EADBC8] text-[#111111] hover:bg-[#DFCEB7] active:bg-[#D5C2AA] border border-[#EADBC8]',
    ghost: 'bg-transparent text-[#111111] hover:bg-[#F8F8F8] border border-transparent',
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon && <span className="mr-2.5 flex items-center">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};
