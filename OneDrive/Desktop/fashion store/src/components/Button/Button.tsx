import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
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
  const baseStyles =
    'inline-flex items-center justify-center font-sans uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#000000]';

  const sizeStyles = {
    sm: 'text-[10px] px-5 py-2.5 tracking-[0.2em]',
    md: 'text-[11px] px-7 py-3.5 tracking-[0.22em]',
    lg: 'text-[12px] px-10 py-4 font-semibold tracking-[0.25em]',
  };

  const variantStyles = {
    primary:
      'bg-[#000000] text-[#FFFFFF] hover:bg-[#222222] active:bg-[#000000] border border-[#000000]',
    secondary:
      'bg-transparent text-[#000000] border border-[#000000] hover:bg-[#000000] hover:text-[#FFFFFF]',
    ghost:
      'bg-transparent text-[#000000] hover:bg-[#F9F8F6] border border-transparent',
  };

  return (
    <motion.button
      whileHover={{ y: -1.5 }}
      whileTap={{ scale: 0.99 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {icon && <span className="mr-2 flex items-center">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};
