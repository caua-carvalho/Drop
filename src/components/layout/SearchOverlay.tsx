import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../../data/products';
import { formatBRL } from '../../lib/format';
import { useUIStore } from '../../store/shop';
import { useEscape, useLockBodyScroll } from '../../hooks/useOverlay';

const POPULAR = ['Camiseta', 'Jeans', 'Look', 'Tênis', 'Boné', 'Bolsa'];

export function SearchOverlay() {
  const open = useUIStore((s) => s.searchOpen);
  const toggleSearch = useUIStore((s) => s.toggleSearch);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useLockBodyScroll(open);
  useEscape(open, () => toggleSearch(false));

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(t);
    }
    setQuery('');
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter((p) =>
      [p.name, p.brand, p.category, p.shortDescription].join(' ').toLowerCase().includes(q),
    ).slice(0, 6);
  }, [query]);

  function submit(value: string) {
    toggleSearch(false);
    navigate(`/loja?busca=${encodeURIComponent(value)}`);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Buscar produtos">
      <div className="absolute inset-0 bg-ink-950/85 backdrop-blur" onClick={() => toggleSearch(false)} />

      <div className="relative mx-auto w-full max-w-3xl px-4 pt-20 sm:pt-28">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (query.trim()) submit(query.trim());
          }}
          className="flex items-center gap-3 border-b border-gold-500/60 pb-3"
        >
          <Search size={22} className="shrink-0 text-gold-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="O que você procura?"
            aria-label="Buscar produtos"
            className="w-full bg-transparent font-display text-2xl text-cream placeholder:text-muted-2 focus:outline-none sm:text-3xl"
          />
          <button
            type="button"
            onClick={() => toggleSearch(false)}
            aria-label="Fechar busca"
            className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full text-cream hover:bg-white/5"
          >
            <X size={20} />
          </button>
        </form>

        <div className="mt-6 max-h-[60vh] overflow-y-auto pr-1">
          {query.trim() === '' ? (
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-2">Buscas populares</p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => submit(term)}
                      className="cursor-pointer rounded-full border border-line px-4 py-2.5 text-sm text-cream/90 transition-colors hover:border-gold-500 hover:text-gold-300"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-2">Categorias</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/loja?categoria=${cat.id}`}
                      onClick={() => toggleSearch(false)}
                      className="flex items-center gap-3 rounded-xl border border-line p-2 transition-colors hover:border-gold-500/60"
                    >
                      <img src={cat.image} alt="" className="h-11 w-11 rounded-lg object-cover" />
                      <span className="text-sm text-cream">{cat.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted">
              Nenhum produto encontrado para “{query}”.
            </p>
          ) : (
            <ul className="divide-y divide-line">
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/produto/${p.slug}`}
                    onClick={() => toggleSearch(false)}
                    className="flex items-center gap-4 py-3 transition-colors hover:bg-white/[0.03]"
                  >
                    <img src={p.image} alt={p.name} className="h-16 w-14 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-2">{p.brand}</p>
                      <p className="truncate text-sm text-cream">{p.name}</p>
                    </div>
                    <span className="text-sm font-semibold text-cream">{formatBRL(p.price)}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <button
                  type="button"
                  onClick={() => submit(query.trim())}
                  className="w-full cursor-pointer rounded-full border border-line py-3 text-xs uppercase tracking-[0.2em] text-gold-300 transition-colors hover:border-gold-500"
                >
                  Ver todos os resultados
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
