import { Link } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { STORE, whatsappLink } from '../../config';
import { formatBRL } from '../../lib/format';
import { cartLines, cartSubtotal, useCartStore, useUIStore } from '../../store/shop';
import { useEscape, useLockBodyScroll } from '../../hooks/useOverlay';
import { buttonClasses } from '../ui/Button';

export function CartDrawer() {
  const open = useUIStore((s) => s.cartOpen);
  const closeCart = useUIStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const setQty = useCartStore((s) => s.setQty);
  const removeItem = useCartStore((s) => s.removeItem);

  useLockBodyScroll(open);
  useEscape(open, closeCart);

  const lines = cartLines(items);
  const subtotal = cartSubtotal(items);
  const remaining = Math.max(0, STORE.freeShippingFrom - subtotal);
  const progress = Math.min(100, (subtotal / STORE.freeShippingFrom) * 100);

  const orderMessage = [
    `Olá! Vim pelo site da ${STORE.name} e quero finalizar este pedido:`,
    '',
    ...lines.map((l) => `• ${l.qty}x ${l.product.name} (${l.size} / ${l.color}) — ${formatBRL(l.total)}`),
    '',
    `Subtotal: ${formatBRL(subtotal)}`,
  ].join('\n');

  return (
    <div
      className={`fixed inset-0 z-[70] ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-ink-950/80 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de compras"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-line bg-ink-900 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-gold-400" />
            <h2 className="font-display text-xl text-cream">Seu carrinho</h2>
            <span className="text-xs text-muted">({lines.length})</span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Fechar carrinho"
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-cream hover:bg-white/5"
          >
            <X size={20} />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full border border-line text-gold-500">
              <ShoppingBag size={26} />
            </div>
            <p className="font-display text-2xl text-cream">Seu carrinho está vazio</p>
            <p className="text-sm text-muted">Explore a coleção e monte seu look.</p>
            <Link to="/loja" onClick={closeCart} className={buttonClasses('primary', 'md', 'mt-2')}>
              Ver produtos
            </Link>
          </div>
        ) : (
          <>
            <div className="border-b border-line px-5 py-3">
              {remaining > 0 ? (
                <p className="text-xs text-muted">
                  Faltam <span className="font-semibold text-gold-300">{formatBRL(remaining)}</span> para o frete grátis
                </p>
              ) : (
                <p className="text-xs font-medium text-gold-300">Você garantiu o frete grátis!</p>
              )}
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-ink-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-300 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-3 py-4">
                  <Link to={`/produto/${line.product.slug}`} onClick={closeCart} className="shrink-0">
                    <img
                      src={line.product.image}
                      alt={line.product.name}
                      className="h-24 w-20 rounded-lg object-cover"
                      loading="lazy"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-2">{line.product.brand}</p>
                        <Link
                          to={`/produto/${line.product.slug}`}
                          onClick={closeCart}
                          className="line-clamp-2 text-sm font-medium text-cream hover:text-gold-300"
                        >
                          {line.product.name}
                        </Link>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(line.key)}
                        aria-label={`Remover ${line.product.name}`}
                        className="grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-full text-muted hover:bg-white/5 hover:text-[#e0796a]"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <p className="mt-0.5 text-xs text-muted">
                      Tam. {line.size} · {line.color}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full border border-line">
                        <button
                          type="button"
                          onClick={() => setQty(line.key, line.qty - 1)}
                          aria-label="Diminuir quantidade"
                          className="grid h-8 w-8 cursor-pointer place-items-center rounded-full text-cream hover:text-gold-300"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-6 text-center text-sm tabular-nums">{line.qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(line.key, line.qty + 1)}
                          aria-label="Aumentar quantidade"
                          className="grid h-8 w-8 cursor-pointer place-items-center rounded-full text-cream hover:text-gold-300"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-cream">{formatBRL(line.total)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-line px-5 py-4 pb-safe-none">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="font-display text-2xl text-cream">{formatBRL(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-muted">
                Frete e prazos combinados no WhatsApp conforme a região.
              </p>

              <Link
                to="/checkout"
                onClick={closeCart}
                className={buttonClasses('primary', 'lg', 'mt-4 w-full')}
              >
                Finalizar compra
              </Link>
              <a
                href={whatsappLink(orderMessage)}
                target="_blank"
                rel="noreferrer"
                className={buttonClasses('outline', 'md', 'mt-2 w-full')}
              >
                Enviar pedido no WhatsApp
              </a>
              <button
                type="button"
                onClick={closeCart}
                className="mt-3 w-full cursor-pointer text-center text-xs text-muted hover:text-cream"
              >
                Continuar comprando
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
