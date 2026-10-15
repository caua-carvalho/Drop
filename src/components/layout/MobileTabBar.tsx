import { NavLink } from 'react-router-dom';
import { Heart, Home, LayoutGrid, Search, ShoppingBag } from 'lucide-react';
import { cartCount, useCartStore, useFavoritesStore, useUIStore } from '../../store/shop';
import { cn } from '../../lib/format';

export function MobileTabBar() {
  const items = useCartStore((s) => s.items);
  const favCount = useFavoritesStore((s) => s.ids.length);
  const openCart = useUIStore((s) => s.openCart);
  const toggleSearch = useUIStore((s) => s.toggleSearch);
  const cartOpen = useUIStore((s) => s.cartOpen);
  const searchOpen = useUIStore((s) => s.searchOpen);

  const count = cartCount(items);
  const linkBase =
    'relative flex flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 py-1 text-[10px] font-medium transition-colors';

  return (
    <nav
      aria-label="Navegação inferior"
      className={cn(
        'fixed inset-x-0 bottom-0 z-[60] border-t border-line glass pb-safe-none lg:hidden',
        (cartOpen || searchOpen) && 'hidden',
      )}
    >
      <ul className="flex items-stretch">
        <li className="flex flex-1">
          <NavLink to="/" end className={({ isActive }) => cn(linkBase, isActive ? 'text-gold-400' : 'text-muted')}>
            <Home size={20} />
            Início
          </NavLink>
        </li>
        <li className="flex flex-1">
          <NavLink to="/loja" className={({ isActive }) => cn(linkBase, isActive ? 'text-gold-400' : 'text-muted')}>
            <LayoutGrid size={20} />
            Loja
          </NavLink>
        </li>
        <li className="flex flex-1">
          <button type="button" onClick={() => toggleSearch(true)} className={cn(linkBase, 'text-muted')}>
            <Search size={20} />
            Buscar
          </button>
        </li>
        <li className="flex flex-1">
          <NavLink
            to="/favoritos"
            className={({ isActive }) => cn(linkBase, isActive ? 'text-gold-400' : 'text-muted')}
          >
            <span className="relative">
              <Heart size={20} />
              {favCount > 0 && (
                <span className="absolute -right-2.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold-500 px-1 text-[9px] font-bold text-ink-950">
                  {favCount}
                </span>
              )}
            </span>
            Favoritos
          </NavLink>
        </li>
        <li className="flex flex-1">
          <button type="button" onClick={openCart} className={cn(linkBase, 'text-muted')}>
            <span className="relative">
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -right-2.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold-500 px-1 text-[9px] font-bold text-ink-950">
                  {count}
                </span>
              )}
            </span>
            Carrinho
          </button>
        </li>
      </ul>
    </nav>
  );
}
