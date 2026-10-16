import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Product } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { Reveal } from '../ui/Reveal';

/** Seção de grade de produtos usada nas várias seções da home. */
export function ProductGridSection({
  eyebrow,
  title,
  products,
  ctaHref,
  ctaLabel = 'Ver tudo',
  id,
}: {
  eyebrow?: string;
  title: string;
  products: Product[];
  ctaHref?: string;
  ctaLabel?: string;
  id?: string;
}) {
  if (products.length === 0) return null;

  return (
    <section id={id} className="container-x cv-auto py-10 lg:py-14" aria-label={title}>
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line pb-4">
        <div>
          {eyebrow && (
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-500">{eyebrow}</p>
          )}
          <h2 className="text-2xl sm:text-3xl">{title}</h2>
        </div>
        {ctaHref && (
          <Link
            to={ctaHref}
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-gold-300 transition-colors hover:text-gold-200"
          >
            {ctaLabel}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-5">
        {products.map((product, i) => (
          <Reveal key={product.id} delay={Math.min(i, 7) * 40}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
