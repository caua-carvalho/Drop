import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  Heart,
  Minus,
  MessageCircle,
  Plus,
  RefreshCcw,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import { PRODUCTS, categoryLabel, getProductBySlug } from '../data/products';
import { STORE, whatsappLink } from '../config';
import { cn, discountPercent, formatBRL, installment } from '../lib/format';
import { Badge, badgeToneFor } from '../components/ui/Badge';
import { Stars } from '../components/ui/Stars';
import { Button, buttonClasses } from '../components/ui/Button';
import { ProductCard } from '../components/product/ProductCard';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Reveal } from '../components/ui/Reveal';
import { useCartStore, useFavoritesStore, useUIStore } from '../store/shop';
import { NotFound } from './NotFound';

function Accordion({
  items,
}: {
  items: { title: string; content: ReactNode }[];
}) {
  const [open, setOpen] = useState(0);
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.title}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left"
            >
              <span className="text-sm font-medium text-cream">{item.title}</span>
              <ChevronDown size={18} className={cn('shrink-0 text-gold-400 transition-transform', isOpen && 'rotate-180')} />
            </button>
            <div className={cn('grid transition-all duration-300', isOpen ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]')}>
              <div className="overflow-hidden text-sm leading-relaxed text-muted">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ProductDetail() {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUIStore((s) => s.openCart);
  const pushToast = useUIStore((s) => s.pushToast);
  const toggleFavorite = useFavoritesStore((s) => s.toggle);
  const favorites = useFavoritesStore((s) => s.ids);

  const [color, setColor] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const [showSticky, setShowSticky] = useState(false);

  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setColor(0);
    setSize(null);
    setQty(1);
    setActiveImage(0);
    setSizeError(false);
  }, [slug]);

  useEffect(() => {
    const node = ctaRef.current;
    if (!node || !('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0), {
      threshold: 0,
    });
    obs.observe(node);
    return () => obs.disconnect();
  }, [slug]);

  const related = useMemo(() => {
    if (!product) return [];
    const sameCategory = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category);
    const others = PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category);
    return [...sameCategory, ...others].slice(0, 4);
  }, [product]);

  if (!product) return <NotFound />;

  const isFav = favorites.includes(product.id);
  const selectedColor = product.colors[color];
  const off = discountPercent(product.price, product.compareAt);
  const inst = installment(product.price);

  function handleAdd(goToCart = true) {
    if (!size) {
      setSizeError(true);
      return;
    }
    addItem(product!.id, size, selectedColor?.name ?? 'Padrão', qty);
    pushToast({
      title: 'Adicionado ao carrinho',
      description: `${product!.name} · ${size} · ${qty} un.`,
      image: product!.image,
    });
    if (goToCart) openCart();
  }

  const productMessage = `Olá! Tenho interesse neste produto do site:\n\n*${product.name}*\nCor: ${selectedColor?.name}\nTamanho: ${size ?? '(a definir)'}\nValor: ${formatBRL(product.price)}`;

  return (
    <div className="container-x pb-28 pt-6 lg:pb-16 lg:pt-10">
      <nav aria-label="Você está em" className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
        <Link to="/" className="hover:text-gold-300">Início</Link>
        <ChevronRight size={13} />
        <Link to="/loja" className="hover:text-gold-300">Loja</Link>
        <ChevronRight size={13} />
        <Link to={`/loja?categoria=${product.category}`} className="hover:text-gold-300">
          {categoryLabel(product.category)}
        </Link>
        <ChevronRight size={13} />
        <span className="text-cream/80">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
        {/* Galeria */}
        <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <div className="flex min-w-0 gap-3">
            <div className="hidden flex-col gap-3 lg:flex">
              {product.images.map((img, i) => (
                <button
                  key={img + i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={`Ver imagem ${i + 1}`}
                  className={cn(
                    'h-20 w-16 cursor-pointer overflow-hidden rounded-lg border transition-colors',
                    activeImage === i ? 'border-gold-500' : 'border-line hover:border-cream/40',
                  )}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>

            <div className="relative min-w-0 flex-1 overflow-hidden rounded-2xl border border-line bg-ink-850">
              <img
                key={product.images[activeImage]}
                src={product.images[activeImage]}
                alt={product.name}
                className="aspect-[4/5] w-full object-cover animate-[fade-up_0.5s_ease-out_both]"
              />
              <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                {product.badge && <Badge tone={badgeToneFor(product.badge)}>{product.badge}</Badge>}
                {off !== null && <Badge tone="danger">-{off}%</Badge>}
              </div>
            </div>
          </div>

          <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar lg:hidden">
            {product.images.map((img, i) => (
              <button
                key={img + i}
                type="button"
                onClick={() => setActiveImage(i)}
                aria-label={`Ver imagem ${i + 1}`}
                className={cn(
                  'h-20 w-16 shrink-0 cursor-pointer overflow-hidden rounded-lg border transition-colors',
                  activeImage === i ? 'border-gold-500' : 'border-line',
                )}
              >
                <img src={img} alt="" className="h-full w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        {/* Informações */}
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-500">{product.brand}</span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <h1 className="mt-3 font-display text-4xl leading-tight text-cream sm:text-5xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <Stars rating={product.rating} reviews={product.reviews} size={15} />
            <span className="text-xs text-muted">({product.reviews} avaliações)</span>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-cream/75 sm:text-base">{product.shortDescription}</p>

          <div className="mt-6 flex items-end gap-3">
            <span className="font-display text-4xl leading-none text-cream">{formatBRL(product.price)}</span>
            {product.compareAt && (
              <span className="pb-1 text-sm text-muted-2 line-through">{formatBRL(product.compareAt)}</span>
            )}
          </div>
          <p className="mt-1.5 text-sm text-muted">
            ou <span className="text-cream/90">{inst.times}x de {formatBRL(inst.value)}</span> sem juros · 5% off no Pix
          </p>

          {/* Cor */}
          <div className="mt-7">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Cor</span>
              <span className="text-xs text-cream/80">{selectedColor?.name}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColor(i)}
                  aria-label={c.name}
                  aria-pressed={color === i}
                  title={c.name}
                  className={cn(
                    'grid h-9 w-9 cursor-pointer place-items-center rounded-full ring-1 ring-inset ring-white/20 transition-all',
                    color === i && 'ring-2 ring-gold-400 ring-offset-2 ring-offset-ink-950',
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Tamanho */}
          <div className="mt-7">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">Tamanho</span>
              <a href="#tamanhos" className="inline-flex items-center gap-1.5 text-xs text-gold-300 hover:text-gold-200">
                <Ruler size={13} /> Guia de tamanhos
              </a>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSize(s);
                    setSizeError(false);
                  }}
                  aria-pressed={size === s}
                  className={cn(
                    'min-w-12 cursor-pointer rounded-xl border px-4 py-2.5 text-sm transition-colors',
                    size === s
                      ? 'border-gold-500 bg-gold-500/10 text-gold-300'
                      : 'border-line text-cream/85 hover:border-cream/40',
                    sizeError && !size && 'border-[#b3402f]/70',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            {sizeError && <p className="mt-2 text-xs text-[#e0796a]">Selecione um tamanho para continuar.</p>}
          </div>

          {/* Quantidade + ações */}
          <div ref={ctaRef} className="mt-8 flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border border-line">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Diminuir quantidade"
                  className="grid h-12 w-12 cursor-pointer place-items-center rounded-full text-cream hover:text-gold-300"
                >
                  <Minus size={15} />
                </button>
                <span className="w-8 text-center text-base tabular-nums">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  aria-label="Aumentar quantidade"
                  className="grid h-12 w-12 cursor-pointer place-items-center rounded-full text-cream hover:text-gold-300"
                >
                  <Plus size={15} />
                </button>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={() => handleAdd(true)}
                className="order-3 w-full min-w-0 sm:order-2 sm:w-auto sm:flex-1"
              >
                <ShoppingBag size={17} /> Adicionar ao carrinho
              </Button>

              <button
                type="button"
                onClick={() => toggleFavorite(product.id)}
                aria-label={isFav ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
                aria-pressed={isFav}
                className="order-2 ml-auto grid h-13 w-13 shrink-0 cursor-pointer place-items-center rounded-full border border-line text-cream transition-colors hover:border-gold-500 hover:text-gold-300 sm:order-3 sm:ml-0"
              >
                <Heart size={19} className={cn(isFav && 'fill-gold-500 text-gold-500')} />
              </button>
            </div>

            <a href={whatsappLink(productMessage)} target="_blank" rel="noreferrer" className={buttonClasses('outline', 'lg', 'w-full')}>
              <MessageCircle size={17} /> Comprar pelo WhatsApp
            </a>
          </div>

          <ul className="mt-6 grid gap-2.5 text-xs text-muted">
            <li className="flex items-center gap-2.5">
              <Truck size={15} className="text-gold-500" /> {STORE.ships} · frete grátis acima de R$ {STORE.freeShippingFrom}
            </li>
            <li className="flex items-center gap-2.5">
              <ShieldCheck size={15} className="text-gold-500" /> Compra segura e produto original
            </li>
            <li className="flex items-center gap-2.5">
              <RefreshCcw size={15} className="text-gold-500" /> Primeira troca de tamanho grátis
            </li>
          </ul>

          <div className="mt-8">
            <Accordion
              items={[
                { title: 'Descrição', content: <p>{product.description}</p> },
                {
                  title: 'Detalhes e composição',
                  content: (
                    <ul className="list-disc space-y-1.5 pl-4">
                      {product.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  ),
                },
                {
                  title: 'Entrega e prazos',
                  content: (
                    <p>
                      Enviamos para todo o Brasil. O prazo e o valor do frete variam conforme a região e são combinados
                      pelo WhatsApp antes do pagamento. Retirada na loja em {STORE.city}/{STORE.state} disponível.
                    </p>
                  ),
                },
                {
                  title: 'Trocas e devoluções',
                  content: (
                    <p>
                      Você tem até 7 dias após o recebimento para solicitar troca ou devolução. A primeira troca de
                      tamanho é por nossa conta. É só chamar no WhatsApp {STORE.whatsappLabel}.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>

      <section id="tamanhos" className="mt-16 scroll-mt-24 lg:mt-24">
        <SectionHeading eyebrow="Antes de comprar" title="Guia rápido de tamanhos" />
        <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <caption className="sr-only">Tabela de medidas aproximadas</caption>
            <thead>
              <tr className="bg-ink-850 text-left text-xs uppercase tracking-[0.14em] text-muted">
                <th className="px-4 py-3 font-medium">Tamanho</th>
                <th className="px-4 py-3 font-medium">Peito (cm)</th>
                <th className="px-4 py-3 font-medium">Comprimento (cm)</th>
                <th className="px-4 py-3 font-medium">Equivale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {[
                ['P', '96', '68', '36'],
                ['M', '102', '70', '38'],
                ['G', '108', '72', '40'],
                ['GG', '114', '74', '42'],
              ].map((row) => (
                <tr key={row[0]} className="text-cream/85">
                  {row.map((cell, i) => (
                    <td key={i} className={cn('px-4 py-3', i === 0 && 'font-semibold text-cream')}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted">
          Medidas aproximadas e podem variar conforme a modelagem da peça. Em dúvida, fale com a gente no WhatsApp — a
          gente ajuda a escolher.
        </p>
      </section>

      <section className="mt-16 lg:mt-24">
        <SectionHeading
          eyebrow="Complete o look"
          title="Quem viu este, viu também"
          action={
            <Link to="/loja" className={buttonClasses('outline', 'md')}>
              Ver a loja
            </Link>
          }
        />
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-5">
          {related.map((p, i) => (
            <Reveal key={p.id} delay={i * 50}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Barra fixa de compra — mobile */}
      <div
        className={cn(
          'fixed inset-x-0 bottom-16 z-[58] border-t border-line glass px-4 pb-4 pt-3 transition-transform duration-300 lg:hidden',
          showSticky ? 'translate-y-0' : 'translate-y-[130%]',
        )}
      >
        <div className="flex items-center gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs text-muted">{product.name}</p>
            <p className="text-base font-semibold text-cream">{formatBRL(product.price)}</p>
          </div>
          <Button variant="primary" size="md" onClick={() => handleAdd(true)} className="ml-auto shrink-0">
            <ShoppingBag size={16} /> Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
}
