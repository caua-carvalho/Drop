import type { ReactNode } from 'react';
import { cn } from '../../lib/format';

type BadgeTone = 'gold' | 'dark' | 'light' | 'danger';

const tones: Record<BadgeTone, string> = {
  gold: 'bg-gold-500 text-ink-950',
  dark: 'bg-ink-950/85 text-cream border border-white/10',
  light: 'bg-cream text-ink-950',
  danger: 'bg-[#b3402f] text-cream',
};

export function Badge({
  children,
  tone = 'gold',
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Mapeia a etiqueta do produto para um tom de cor. */
export function badgeToneFor(label: string): BadgeTone {
  if (label === 'Promoção') return 'danger';
  if (label === 'Mais vendido') return 'light';
  return 'gold';
}
