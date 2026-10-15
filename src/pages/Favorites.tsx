import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { buttonClasses } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { useFavoritesStore } from '../store/shop';

export function Favorites() {
  const ids = useFavoritesStore((s) => s.ids);
  const clear = useFavoritesStore((s) => s.clear);
  const products = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <div className="container-x py-10 lg:py-14">
      <div className="flex flex-col gap-3 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-500">Sua seleção</p>
          <h1 className="mt-2 font-display text-4xl text-cream sm:text-5xl">Favoritos</h1>
          <p className="mt-2 text-sm text-muted">
            {products.length} {products.length === 1 ? 'peça salva' : 'peças salvas'}
          </p>
        </div>
        {products.length > 0 && (
          <button
            type="button"
            onClick={clear}
            className="cursor-pointer self-start text-xs text-muted hover:text-cream sm:self-auto"
          >
            Limpar favoritos
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-5 py-24 text-center">
          <span className="grid h-20 w-20 place-items-center rounded-full border border-line text-gold-500">
            <Heart size={32} />
          </span>
          <div>
            <p className="font-display text-3xl text-cream">Nada salvo ainda</p>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Toque no coraçãozinho dos produtos que você gostou para encontrá-los aqui depois.
            </p>
          </div>
          <Link to="/loja" className={buttonClasses('primary', 'lg')}>
            Explorar a coleção
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-5">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 50}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
