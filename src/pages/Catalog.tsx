import { useMemo, useState, type ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, PackageOpen, SlidersHorizontal, X } from 'lucide-react';
import { BRANDS, CATEGORIES, COLORS, PRODUCTS, SIZES, brandNameBySlug, brandSlug, type Product } from '../data/products';
import { cn, formatBRL } from '../lib/format';
import { ProductCard } from '../components/product/ProductCard';
import { Button, buttonClasses } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { useEscape, useLockBodyScroll } from '../hooks/useOverlay';

type SortKey = 'destaques' | 'novidades' | 'preco-asc' | 'preco-desc' | 'avaliacao';

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'destaques', label: 'Destaques' },
  { key: 'novidades', label: 'Novidades' },
  { key: 'preco-asc', label: 'Menor preço' },
  { key: 'preco-desc', label: 'Maior preço' },
  { key: 'avaliacao', label: 'Melhor avaliados' },
];

const PRICE_MIN = 0;
const PRICE_MAX = 500;

function sortProducts(list: Product[], sort: SortKey): Product[] {
  const copy = [...list];
  switch (sort) {
    case 'preco-asc':
      return copy.sort((a, b) => a.price - b.price);
    case 'preco-desc':
      return copy.sort((a, b) => b.price - a.price);
    case 'avaliacao':
      return copy.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    case 'novidades':
      return copy.sort((a, b) => Number(b.badge === 'Novo') - Number(a.badge === 'Novo'));
    default:
      return copy.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || b.reviews - a.reviews,
      );
  }
}

function FilterPanel({
  params,
  toggleMulti,
  setParam,
  onDone,
}: {
  params: URLSearchParams;
  toggleMulti: (key: string, value: string) => void;
  setParam: (key: string, value: string | null) => void;
  onDone?: () => void;
}) {
  const cats = params.getAll('categoria');
  const sizes = params.getAll('tamanho');
  const colors = params.getAll('cor');
  const marcas = params.getAll('marca');
  const maxPrice = Number(params.get('maxPreco') ?? PRICE_MAX);
  const onlyPromo = params.get('promo') === '1';

  return (
    <div className="flex flex-col gap-7">
      <FilterGroup title="Categoria">
        <div className="flex flex-col gap-1">
          {CATEGORIES.map((cat) => {
            const active = cats.includes(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleMulti('categoria', cat.id)}
                className={cn(
                  'flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-sm transition-colors',
                  active ? 'bg-gold-500/10 text-gold-300' : 'text-cream/80 hover:bg-white/5',
                )}
              >
                {cat.label}
                {active && <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Marca">
        <div className="flex flex-col gap-1">
          {BRANDS.map((brand) => {
            const active = marcas.includes(brand.slug);
            return (
              <button
                key={brand.slug}
                type="button"
                onClick={() => toggleMulti('marca', brand.slug)}
                className={cn(
                  'flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-sm transition-colors',
                  active ? 'bg-gold-500/10 text-gold-300' : 'text-cream/80 hover:bg-white/5',
                )}
              >
                {brand.name}
                {active && <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Tamanho">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => {
            const active = sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleMulti('tamanho', size)}
                className={cn(
                  'min-w-10 cursor-pointer rounded-lg border px-3 py-1.5 text-xs transition-colors',
                  active
                    ? 'border-gold-500 bg-gold-500/10 text-gold-300'
                    : 'border-line text-cream/80 hover:border-cream/40',
                )}
              >
                {size}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Cor">
        <div className="flex flex-wrap gap-3">
          {COLORS.map((color) => {
            const active = colors.includes(color.name);
            return (
              <button
                key={color.name}
                type="button"
                onClick={() => toggleMulti('cor', color.name)}
                aria-label={color.name}
                aria-pressed={active}
                title={color.name}
                className={cn(
                  'grid h-8 w-8 cursor-pointer place-items-center rounded-full ring-1 ring-inset ring-white/20 transition-all',
                  active && 'ring-2 ring-gold-400 ring-offset-2 ring-offset-ink-950',
                )}
                style={{ backgroundColor: color.hex }}
              />
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Preço">
        <div className="px-1">
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            step={10}
            value={maxPrice}
            onChange={(e) => setParam('maxPreco', e.target.value === String(PRICE_MAX) ? null : e.target.value)}
            aria-label="Preço máximo"
            className="w-full cursor-pointer accent-gold-500"
          />
          <div className="mt-1 flex justify-between text-xs text-muted">
            <span>{formatBRL(PRICE_MIN)}</span>
            <span className="font-medium text-cream">até {formatBRL(maxPrice)}</span>
          </div>
        </div>
      </FilterGroup>

      <FilterGroup title="Outros">
        <label className="flex cursor-pointer items-center gap-2.5 px-1 text-sm text-cream/80">
          <input
            type="checkbox"
            checked={onlyPromo}
            onChange={(e) => setParam('promo', e.target.checked ? '1' : null)}
            className="h-4 w-4 cursor-pointer accent-gold-500"
          />
          Somente promoções
        </label>
      </FilterGroup>

      {onDone && (
        <Button variant="primary" size="lg" onClick={onDone} className="mt-1 w-full">
          Ver resultados
        </Button>
      )}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-2">{title}</h3>
      {children}
    </div>
  );
}

export function Catalog() {
  const [params, setParams] = useSearchParams();
  const [sheetOpen, setSheetOpen] = useState(false);

  useLockBodyScroll(sheetOpen);
  useEscape(sheetOpen, () => setSheetOpen(false));

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value === null || value === '') next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const toggleMulti = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    const current = next.getAll(key);
    next.delete(key);
    const updated = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    updated.forEach((v) => next.append(key, v));
    setParams(next, { replace: true });
  };

  const clearAll = () => {
    const next = new URLSearchParams();
    const busca = params.get('busca');
    if (busca) next.set('busca', busca);
    setParams(next, { replace: true });
  };

  const cats = params.getAll('categoria');
  const sizes = params.getAll('tamanho');
  const colors = params.getAll('cor');
  const marcas = params.getAll('marca');
  const maxPrice = Number(params.get('maxPreco') ?? PRICE_MAX);
  const onlyPromo = params.get('promo') === '1';
  const busca = params.get('busca') ?? '';
  const sort = (params.get('ordenar') as SortKey) ?? 'destaques';

  const results = useMemo(() => {
    const q = busca.trim().toLowerCase();
    const filtered = PRODUCTS.filter((p) => {
      if (cats.length && !cats.includes(p.category)) return false;
      if (marcas.length && !marcas.includes(brandSlug(p.brand))) return false;
      if (sizes.length && !p.sizes.some((s) => sizes.includes(s))) return false;
      if (colors.length && !p.colors.some((c) => colors.includes(c.name))) return false;
      if (p.price > maxPrice) return false;
      if (onlyPromo && !p.compareAt) return false;
      if (q && !`${p.name} ${p.brand} ${p.category} ${p.shortDescription}`.toLowerCase().includes(q)) return false;
      return true;
    });
    return sortProducts(filtered, sort);
  }, [cats, marcas, sizes, colors, maxPrice, onlyPromo, busca, sort]);

  const activeChips: { key: string; value: string; label: string }[] = [
    ...cats.map((c) => ({ key: 'categoria', value: c, label: CATEGORIES.find((x) => x.id === c)?.label ?? c })),
    ...marcas.map((m) => ({ key: 'marca', value: m, label: brandNameBySlug(m) ?? m })),
    ...sizes.map((s) => ({ key: 'tamanho', value: s, label: `Tam. ${s}` })),
    ...colors.map((c) => ({ key: 'cor', value: c, label: c })),
    ...(onlyPromo ? [{ key: 'promo', value: '1', label: 'Promoções' }] : []),
    ...(maxPrice < PRICE_MAX ? [{ key: 'maxPreco', value: String(maxPrice), label: `Até ${formatBRL(maxPrice)}` }] : []),
  ];

  const title =
    cats.length === 1
      ? CATEGORIES.find((c) => c.id === cats[0])?.label ?? 'Loja'
      : marcas.length === 1
        ? brandNameBySlug(marcas[0]) ?? 'Loja'
        : 'Loja';
  const hasFilters = activeChips.length > 0;

  return (
    <div className="container-x py-8 lg:py-12">
      <nav aria-label="Você está em" className="flex items-center gap-1.5 text-xs text-muted">
        <Link to="/" className="hover:text-gold-300">
          Início
        </Link>
        <ChevronRight size={13} />
        <span className="text-cream/80">{busca ? `Busca: “${busca}”` : title}</span>
      </nav>

      <div className="mt-4 flex flex-col gap-3 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-4xl leading-none text-cream sm:text-5xl">{busca ? 'Resultados' : title}</h1>
          <p className="mt-2 text-sm text-muted">
            {results.length} {results.length === 1 ? 'produto' : 'produtos'}
            {busca && ` para “${busca}”`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className={cn(
              'inline-flex h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-xs font-medium lg:hidden',
              hasFilters ? 'border-gold-500 text-gold-300' : 'border-line text-cream',
            )}
          >
            <SlidersHorizontal size={15} /> Filtros
            {hasFilters && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-ink-950">
                {activeChips.length}
              </span>
            )}
          </button>

          <label className="relative inline-flex items-center">
            <span className="sr-only">Ordenar por</span>
            <select
              value={sort}
              onChange={(e) => setParam('ordenar', e.target.value === 'destaques' ? null : e.target.value)}
              className="h-11 cursor-pointer appearance-none rounded-full border border-line bg-ink-900 pl-4 pr-9 text-base sm:text-sm text-cream focus:border-gold-500 focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronRight size={14} className="pointer-events-none absolute right-3 rotate-90 text-muted" />
          </label>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-2xl text-cream">Filtros</h2>
              {hasFilters && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="cursor-pointer text-xs text-gold-300 hover:text-gold-200"
                >
                  Limpar
                </button>
              )}
            </div>
            <FilterPanel params={params} toggleMulti={toggleMulti} setParam={setParam} />
          </div>
        </aside>

        <div>
          {hasFilters && (
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {activeChips.map((chip) => (
                <button
                  key={`${chip.key}-${chip.value}`}
                  type="button"
                  onClick={() => toggleMulti(chip.key, chip.value)}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line bg-ink-900 py-1.5 pl-3 pr-2 text-xs text-cream/90 transition-colors hover:border-gold-500/60"
                >
                  {chip.label}
                  <X size={13} className="text-muted" />
                </button>
              ))}
              <button
                type="button"
                onClick={clearAll}
                className="cursor-pointer px-2 text-xs text-gold-300 hover:text-gold-200"
              >
                Limpar tudo
              </button>
            </div>
          )}

          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-line bg-ink-900/50 py-20 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full border border-line text-gold-500">
                <PackageOpen size={28} />
              </span>
              <div>
                <p className="font-display text-2xl text-cream">Nada encontrado por aqui</p>
                <p className="mt-1 text-sm text-muted">Tente ajustar os filtros ou buscar por outro termo.</p>
              </div>
              <button type="button" onClick={clearAll} className={buttonClasses('outline', 'md')}>
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3 lg:gap-x-5 xl:grid-cols-4">
              {results.map((product, i) => (
                <Reveal key={product.id} delay={Math.min(i, 8) * 40}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filtros — bottom sheet no mobile */}
      <div
        className={cn('fixed inset-0 z-[75] lg:hidden', sheetOpen ? 'pointer-events-auto' : 'pointer-events-none')}
        aria-hidden={!sheetOpen}
      >
        <div
          onClick={() => setSheetOpen(false)}
          className={cn('absolute inset-0 bg-ink-950/80 backdrop-blur-sm transition-opacity', sheetOpen ? 'opacity-100' : 'opacity-0')}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filtros"
          className={cn(
            'absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-3xl border-t border-line bg-ink-900 p-5 pb-8 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
            sheetOpen ? 'translate-y-0' : 'translate-y-full',
          )}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-2xl text-cream">Filtros</h2>
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              aria-label="Fechar filtros"
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-cream hover:bg-white/5"
            >
              <X size={20} />
            </button>
          </div>
          <FilterPanel params={params} toggleMulti={toggleMulti} setParam={setParam} onDone={() => setSheetOpen(false)} />
        </div>
      </div>
    </div>
  );
}
