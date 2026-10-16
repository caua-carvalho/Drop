import { cn } from '../../lib/format';

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('relative overflow-hidden rounded-lg bg-ink-850/70', className)}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <article className="group relative flex flex-col">
      <Skeleton className="aspect-[4/5] w-full rounded-lg" />
      <div className="flex flex-1 flex-col gap-2 pt-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-2.5 w-16 rounded-sm" />
          <Skeleton className="h-2.5 w-10 rounded-sm" />
        </div>
        <Skeleton className="h-4 w-11/12 rounded-sm" />
        <div className="mt-auto flex items-end justify-between pt-1">
          <Skeleton className="h-4 w-20 rounded-sm" />
          <div className="flex gap-1">
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-3 rounded-full" />
          </div>
        </div>
      </div>
    </article>
  );
}

export function GridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-5">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
