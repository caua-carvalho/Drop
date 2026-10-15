import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/format';

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'dark';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-bold uppercase tracking-[0.14em] transition-all duration-200 disabled:opacity-45 disabled:pointer-events-none select-none cursor-pointer rounded-lg whitespace-nowrap';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-gold-500 text-ink-950 hover:bg-gold-400 active:scale-[0.98] hover:-translate-y-px shadow-[0_12px_40px_-16px_rgba(0,213,213,0.8)]',
  outline:
    'border border-white/15 text-cream hover:bg-white/8 active:scale-[0.98] bg-transparent',
  ghost: 'text-cream/90 hover:text-gold-300 hover:bg-white/5 active:scale-[0.98]',
  dark: 'bg-ink-800 text-cream hover:bg-ink-700 active:scale-[0.98] border border-line',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-5 text-[11px]',
  md: 'h-11 px-7 text-[11px]',
  lg: 'h-12 px-8 text-xs',
};

export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

export function Button({ variant = 'primary', size = 'md', className, children, ...rest }: ButtonProps) {
  return (
    <button className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
