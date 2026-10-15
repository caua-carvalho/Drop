import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PRODUCTS, getProductById } from '../data/products';

/* ----------------------------- Carrinho ----------------------------- */

export type CartItem = {
  key: string;
  productId: string;
  size: string;
  color: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  addItem: (productId: string, size: string, color: string, qty?: number) => void;
  removeItem: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
};

const itemKey = (productId: string, size: string, color: string) => `${productId}__${size}__${color}`;

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (productId, size, color, qty = 1) =>
        set((state) => {
          const key = itemKey(productId, size, color);
          const existing = state.items.find((i) => i.key === key);
          if (existing) {
            return {
              items: state.items.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i)),
            };
          }
          return { items: [...state.items, { key, productId, size, color, qty }] };
        }),
      removeItem: (key) => set((state) => ({ items: state.items.filter((i) => i.key !== key) })),
      setQty: (key, qty) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.key === key ? { ...i, qty: Math.max(1, Math.min(99, qty)) } : i))
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: 'drop-cart' },
  ),
);

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.qty, 0);
}

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, i) => {
    const product = getProductById(i.productId);
    return sum + (product ? product.price * i.qty : 0);
  }, 0);
}

export function cartLines(items: CartItem[]) {
  return items
    .map((item) => {
      const product = getProductById(item.productId);
      return product ? { ...item, product, total: product.price * item.qty } : null;
    })
    .filter((line): line is NonNullable<typeof line> => line !== null);
}

/* ----------------------------- Favoritos ---------------------------- */

type FavoritesState = {
  ids: string[];
  toggle: (id: string) => void;
  clear: () => void;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      ids: [],
      toggle: (id) =>
        set((state) => ({
          ids: state.ids.includes(id) ? state.ids.filter((x) => x !== id) : [...state.ids, id],
        })),
      clear: () => set({ ids: [] }),
    }),
    { name: 'drop-favorites' },
  ),
);

/* --------------------------- UI + notificações ---------------------- */

export type Toast = {
  id: number;
  title: string;
  description?: string;
  image?: string;
};

type UIState = {
  cartOpen: boolean;
  searchOpen: boolean;
  menuOpen: boolean;
  toasts: Toast[];
  openCart: () => void;
  closeCart: () => void;
  toggleSearch: (value?: boolean) => void;
  setMenuOpen: (value: boolean) => void;
  pushToast: (toast: Omit<Toast, 'id'>) => void;
  dismissToast: (id: number) => void;
};

let toastId = 0;

export const useUIStore = create<UIState>((set) => ({
  cartOpen: false,
  searchOpen: false,
  menuOpen: false,
  toasts: [],
  openCart: () => set({ cartOpen: true, menuOpen: false }),
  closeCart: () => set({ cartOpen: false }),
  toggleSearch: (value) => set((state) => ({ searchOpen: value ?? !state.searchOpen, menuOpen: false })),
  setMenuOpen: (value) => set({ menuOpen: value }),
  pushToast: (toast) => {
    const id = ++toastId;
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 3800);
  },
  dismissToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

/* ------------------------------ Helpers ----------------------------- */

export function useProductSlugsWithStock() {
  return PRODUCTS.map((p) => p.slug);
}
