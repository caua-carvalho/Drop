import { cn, discountPercent, formatBRL, installment } from '../../lib/format';

type PriceProps = {
  price: number;
  compareAt?: number;
  size?: 'sm' | 'md' | 'lg';
  showInstallment?: boolean;
  className?: string;
};

const sizes = {
  sm: { now: 'text-sm', was: 'text-xs', off: 'text-[10px]' },
  md: { now: 'text-base', was: 'text-xs', off: 'text-[10px]' },
  lg: { now: 'text-2xl', was: 'text-sm', off: 'text-xs' },
} as const;

export function Price({ price, compareAt, size = 'md', showInstallment = false, className }: PriceProps) {
  const off = discountPercent(price, compareAt);
  const s = sizes[size];
  return (
    <div className={cn('flex flex-col gap-0.5', className)}>
      <div className="flex flex-wrap items-baseline gap-2">
        <span className={cn('font-semibold text-cream', s.now)}>{formatBRL(price)}</span>
        {compareAt && (
          <span className={cn('text-muted-2 line-through', s.was)}>{formatBRL(compareAt)}</span>
        )}
        {off !== null && (
          <span className={cn('font-semibold text-gold-400', s.off)}>-{off}%</span>
        )}
      </div>
      {showInstallment && (
        <span className="text-xs text-muted">
          ou {installment(price).times}x de {formatBRL(installment(price).value)} sem juros
        </span>
      )}
    </div>
  );
}
