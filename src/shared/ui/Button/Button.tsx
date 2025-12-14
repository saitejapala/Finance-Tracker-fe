import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@shared/lib/clsx'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}
export const Button = ({ children, variant = 'primary', className, ...props }: ButtonProps) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-200"

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
  }
  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </button>
  )
}