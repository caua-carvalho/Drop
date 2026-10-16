import { Link } from 'react-router-dom';
import { BRANDS } from '../../data/products';

/** Tiles de marca — acesso rápido ao catálogo filtrado por marca. */
export function BrandStrip() {
  const featured = BRANDS.filter((b) => b.featured);
  if (featured.length === 0) return null;

  return (
    <section className="container-x cv-auto py-12 lg:py-16" aria-label="Marcas">
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl">Marcas</h2>
        <Link
          to="/loja"
          className="text-xs font-bold uppercase tracking-[0.14em] text-gold-300 transition-colors hover:text-gold-200"
        >
          Ver tudo
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-2.5 sm:gap-3 lg:grid-cols-8">
        {featured.map((brand) => (
          <Link
            key={brand.slug}
            to={`/loja?marca=${brand.slug}`}
            className="group relative block aspect-square overflow-hidden rounded-xl border border-line"
          >
            <img
              src={brand.image}
              alt={brand.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-2 text-center text-[10px] font-bold uppercase leading-tight tracking-[0.1em] text-cream sm:text-xs">
              {brand.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
