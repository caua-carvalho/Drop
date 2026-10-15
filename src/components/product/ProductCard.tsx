import { Link } from 'react-router-dom';
import { Heart, Plus } from 'lucide-react';
import type { Product } from '../../data/products';
import { cn, formatBRL, discountPercent } from '../../lib/format';
import { Badge, badgeToneFor } from '../ui/Badge';
import { Stars } from '../ui/Stars';
import { useCartStore, useFavoritesStore, useUIStore } from '../../store/shop';

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const toggleFavorite = useFavoritesStore((s) => s.toggle);
  const favorites = useFavoritesStore((s) => s.ids);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUIStore((s) => s.openCart);
  const pushToast = useUIStore((s) => s.pushToast);

  const isFav = favorites.includes(product.id);
  const off = discountPercent(product.price, product.compareAt);

  function handleQuickAdd() {
    const size = product.sizes[0];
    const color = product.colors[0]?.name ?? 'Padrão';
    addItem(product.id, size, color, 1);
    pushToast({ title: 'Adicionado ao carrinho', description: `${product.name} · ${size}`, image: product.image });
    openCart();
  }

  return (
    <article className={cn('group relative flex flex-col', className)}>
      <div className="relative overflow-hidden rounded-lg bg-ink-850">
        <Link
          to={`/produto/${product.slug}`}
          aria-label={`Ver ${product.name}`}
          className="block aspect-[4/5] overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-400 group-hover:opacity-100"
            />
          )}
        </Link>

        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1.5">
            {product.badge && <Badge tone={badgeToneFor(product.badge)}>{product.badge}</Badge>}
            {off !== null && !product.badge && <Badge tone="danger">-{off}%</Badge>}
          </div>
        </div>

        <button
          type="button"
          onClick={() => toggleFavorite(product.id)}
          aria-label={isFav ? `Remover ${product.name} dos favoritos` : `Salvar ${product.name} nos favoritos`}
          aria-pressed={isFav}
          className="absolute right-2 top-2 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-ink-950/70 text-cream backdrop-blur transition-colors hover:bg-ink-950 hover:text-gold-300"
        >
          <Heart size={16} className={cn(isFav && 'fill-gold-500 text-gold-500')} />
        </button>

        <button
          type="button"
          onClick={handleQuickAdd}
          className="absolute inset-x-2 bottom-2 flex h-11 translate-y-3 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gold-500 px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-ink-950 opacity-0 transition-all duration-300 hover:bg-gold-400 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 max-md:translate-y-0 max-md:opacity-100 max-md:bg-gold-500 max-md:text-ink-950"
        >
          <Plus size={14} /> Adicionar
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 pt-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-2">{product.brand}</span>
          <Stars rating={product.rating} showValue size={12} className="scale-90" />
        </div>

        <h3 className="text-sm font-bold uppercase leading-snug tracking-[0.02em] text-cream">
          <Link to={`/produto/${product.slug}`} className="transition-colors hover:text-gold-300">
            {product.name}
          </Link>
        </h3>

        <div className="mt-auto flex items-end justify-between gap-3 pt-1">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-cream">{formatBRL(product.price)}</span>
            {product.compareAt && (
              <span className="text-xs text-muted-2 line-through">{formatBRL(product.compareAt)}</span>
            )}
          </div>
          <div className="flex items-center gap-1" aria-hidden="true">
            {product.colors.slice(0, 3).map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="h-3 w-3 rounded-full ring-1 ring-white/25"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
