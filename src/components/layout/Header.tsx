import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { STORE } from '../../config';
import { cn } from '../../lib/format';
import { cartCount, useCartStore, useFavoritesStore, useUIStore } from '../../store/shop';
import { CATEGORIES } from '../../data/products';

const NAV = [
  { label: 'Início', to: '/' },
  { label: 'Loja', to: '/loja' },
  { label: 'Looks', to: '/loja?categoria=looks' },
  { label: 'Feminino', to: '/loja?categoria=feminino' },
  { label: 'Acessórios', to: '/loja?categoria=acessorios' },
  { label: 'Sobre', to: '/sobre' },
];

export function Header() {
  const items = useCartStore((s) => s.items);
  const favCount = useFavoritesStore((s) => s.ids.length);
  const openCart = useUIStore((s) => s.openCart);
  const toggleSearch = useUIStore((s) => s.toggleSearch);
  const menuOpen = useUIStore((s) => s.menuOpen);
  const setMenuOpen = useUIStore((s) => s.setMenuOpen);

  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search, setMenuOpen]);

  const count = cartCount(items);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 border-b transition-colors duration-300',
          scrolled ? 'border-line glass' : 'border-transparent bg-ink-950',
        )}
      >
        <div className="container-x flex h-16 items-center justify-between gap-3 lg:h-20">
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-cream hover:bg-white/5"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          <Link to="/" className="flex items-center gap-3" aria-label={`${STORE.name} — página inicial`}>
            <img
              src="/brand/logo.webp"
              alt=""
              width={44}
              height={44}
              className="h-10 w-10 object-contain lg:h-12 lg:w-12"
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-xl font-bold uppercase tracking-[0.18em] text-cream lg:text-2xl">Drop</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.48em] text-gold-500 lg:text-[10px]">
                Multimarcas
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'relative text-xs font-bold uppercase tracking-[0.18em] transition-colors',
                    isActive ? 'text-gold-400' : 'text-cream/90 hover:text-gold-300',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => toggleSearch(true)}
              aria-label="Buscar produtos"
              className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-cream hover:bg-white/5 hover:text-gold-300"
            >
              <Search size={20} />
            </button>
            <Link
              to="/favoritos"
              aria-label={`Favoritos${favCount ? ` (${favCount})` : ''}`}
              className="relative hidden h-10 w-10 place-items-center rounded-full text-cream hover:bg-white/5 hover:text-gold-300 sm:grid"
            >
              <Heart size={20} />
              {favCount > 0 && (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-ink-950">
                  {favCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-label={`Abrir carrinho${count ? ` (${count} itens)` : ''}`}
              className="relative grid h-10 w-10 cursor-pointer place-items-center rounded-full text-cream hover:bg-white/5 hover:text-gold-300"
            >
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-ink-950">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-40 lg:hidden',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={cn('absolute inset-0 bg-ink-950/80 backdrop-blur-sm transition-opacity', open ? 'opacity-100' : 'opacity-0')}
      />
      <nav
        aria-label="Menu"
        className={cn(
          'absolute inset-x-0 top-16 origin-top border-b border-line bg-ink-900 px-5 pb-8 pt-4 transition-all duration-300',
          open ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0',
        )}
      >
        <ul className="flex flex-col">
          {NAV.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                onClick={onClose}
                className="block border-b border-line/70 py-3.5 font-display text-2xl uppercase tracking-[0.08em] text-cream transition-colors hover:text-gold-300"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-2">Categorias</p>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/loja?categoria=${cat.id}`}
              onClick={onClose}
              className="rounded-lg border border-white/10 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.12em] text-cream/90 transition-colors hover:border-gold-500 hover:text-gold-300"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
