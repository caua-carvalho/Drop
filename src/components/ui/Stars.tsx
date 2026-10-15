import { Star } from 'lucide-react';
import { cn, ratingLabel } from '../../lib/format';

type StarsProps = {
  rating: number;
  reviews?: number;
  size?: number;
  showValue?: boolean;
  className?: string;
};

export function Stars({ rating, reviews, size = 14, showValue = true, className }: StarsProps) {
  const rounded = Math.round(rating);
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span className="inline-flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={size}
            className={i < rounded ? 'fill-gold-400 text-gold-400' : 'text-ink-600'}
            strokeWidth={1.5}
          />
        ))}
      </span>
      {showValue && <span className="text-xs text-muted">{rating.toFixed(1)}</span>}
      {reviews !== undefined && <span className="sr-only">{ratingLabel(rating, reviews)}</span>}
    </span>
  );
}
