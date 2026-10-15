import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronLeft, MessageCircle, ShoppingBag, Store, Truck } from 'lucide-react';
import { STORE, whatsappLink } from '../config';
import { cn, formatBRL } from '../lib/format';
import { cartLines, cartSubtotal, useCartStore } from '../store/shop';
import { Button, buttonClasses } from '../components/ui/Button';

type Field = 'name' | 'phone' | 'cep' | 'address' | 'city';

const PAYMENTS = [
  { id: 'pix', label: 'Pix', note: '5% de desconto' },
  { id: 'credito', label: 'Cartão de crédito', note: 'até 3x sem juros' },
  { id: 'dinheiro', label: 'Dinheiro na loja', note: 'somente retirada' },
] as const;

export function Checkout() {
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);

  const lines = cartLines(items);
  const subtotal = cartSubtotal(items);

  const [delivery, setDelivery] = useState<'entrega' | 'retirada'>('entrega');
  const [payment, setPayment] = useState<(typeof PAYMENTS)[number]['id']>('pix');
  const [form, setForm] = useState<Record<Field, string>>({ name: '', phone: '', cep: '', address: '', city: '' });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState<string | null>(null);
  const [sentMessage, setSentMessage] = useState('');

  const shippingFree = subtotal >= STORE.freeShippingFrom;
  const pixDiscount = payment === 'pix' ? subtotal * 0.05 : 0;
  const total = subtotal - pixDiscount;

  const orderNumber = useMemo(() => `DROP-${Math.floor(100000 + Math.random() * 899999)}`, []);

  if (lines.length === 0 && !sent) {
    return (
      <div className="container-x flex flex-col items-center justify-center gap-5 py-24 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full border border-line text-gold-500">
          <ShoppingBag size={32} />
        </span>
        <div>
          <h1 className="font-display text-3xl text-cream">Seu carrinho está vazio</h1>
          <p className="mt-2 max-w-sm text-sm text-muted">
            Adicione algumas peças para finalizar seu pedido.
          </p>
        </div>
        <Link to="/loja" className={buttonClasses('primary', 'lg')}>
          Ver a coleção
        </Link>
      </div>
    );
  }

  if (sent) {
    return (
      <div className="container-x py-20 lg:py-28">
        <div className="mx-auto max-w-xl rounded-2xl border border-gold-500/25 bg-ink-900/60 p-8 text-center sm:p-12">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold-500/15 text-gold-400">
            <CheckCircle2 size={32} />
          </span>
          <h1 className="mt-6 font-display text-3xl text-cream sm:text-4xl">Pedido enviado!</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Abrimos o WhatsApp com o resumo do seu pedido. Se a janela não abriu, use o botão abaixo. Nosso time vai
            confirmar estoque, frete e pagamento.
          </p>
          <p className="mt-4 inline-block rounded-full border border-line px-4 py-1.5 text-xs tracking-wider text-gold-300">
            Pedido {sent}
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <a href={whatsappLink(sentMessage)} target="_blank" rel="noreferrer" className={buttonClasses('primary', 'lg')}>
              <MessageCircle size={17} /> Abrir WhatsApp novamente
            </a>
            <Link to="/loja" className={buttonClasses('outline', 'md')}>
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  function validate(): boolean {
    const next: Partial<Record<Field, string>> = {};
    if (!form.name.trim()) next.name = 'Informe seu nome.';
    if (!form.phone.trim()) next.phone = 'Informe um telefone/WhatsApp.';
    if (delivery === 'entrega') {
      if (!form.cep.trim()) next.cep = 'Informe o CEP.';
      if (!form.address.trim()) next.address = 'Informe o endereço.';
      if (!form.city.trim()) next.city = 'Informe cidade e estado.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const paymentLabel = PAYMENTS.find((p) => p.id === payment)?.label ?? payment;
    const message = [
      `*Novo pedido — ${STORE.name}*`,
      `Pedido: ${orderNumber}`,
      '',
      `*Cliente:* ${form.name}`,
      `*Contato:* ${form.phone}`,
      delivery === 'entrega' ? `*Entrega:* ${form.address}, ${form.city} — CEP ${form.cep}` : '*Retirada:* na loja',
      `*Pagamento:* ${paymentLabel}`,
      '',
      '*Itens:*',
      ...lines.map((l) => `• ${l.qty}x ${l.product.name} (Tam. ${l.size} / ${l.color}) — ${formatBRL(l.total)}`),
      '',
      `Subtotal: ${formatBRL(subtotal)}`,
      ...(pixDiscount > 0 ? [`Desconto Pix (5%): -${formatBRL(pixDiscount)}`] : []),
      delivery === 'entrega' && !shippingFree ? 'Frete: a combinar' : '',
      `*Total: ${formatBRL(total)}*`,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(whatsappLink(message), '_blank', 'noopener');
    setSentMessage(message);
    setSent(orderNumber);
    clear();
  }

  return (
    <div className="container-x py-8 lg:py-12">
      <Link to="/loja" className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-gold-300">
        <ChevronLeft size={14} /> Continuar comprando
      </Link>

      <h1 className="mt-4 font-display text-4xl text-cream sm:text-5xl">Finalizar pedido</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Preencha seus dados e envie o pedido pelo WhatsApp. Não é necessário pagar agora — confirmamos tudo com você
        antes.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
        <div className="space-y-8">
          {/* Entrega */}
          <section>
            <h2 className="mb-4 font-display text-2xl text-cream">Como você quer receber?</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <DeliveryOption
                active={delivery === 'entrega'}
                onClick={() => setDelivery('entrega')}
                icon={<Truck size={18} />}
                title="Entrega"
                text="Enviamos para todo o Brasil"
              />
              <DeliveryOption
                active={delivery === 'retirada'}
                onClick={() => setDelivery('retirada')}
                icon={<Store size={18} />}
                title="Retirar na loja"
                text={`${STORE.city}/${STORE.state} · ${STORE.openingHours}`}
              />
            </div>
          </section>

          {/* Dados */}
          <section>
            <h2 className="mb-4 font-display text-2xl text-cream">Seus dados</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Nome completo"
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                error={errors.name}
                placeholder="Ex.: Maria Souza"
                className="sm:col-span-2"
              />
              <Input
                label="Telefone / WhatsApp"
                value={form.phone}
                onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                error={errors.phone}
                placeholder="(12) 90000-0000"
              />
              {delivery === 'entrega' && (
                <>
                  <Input
                    label="CEP"
                    value={form.cep}
                    onChange={(v) => setForm((f) => ({ ...f, cep: v }))}
                    error={errors.cep}
                    placeholder="00000-000"
                  />
                  <Input
                    label="Endereço"
                    value={form.address}
                    onChange={(v) => setForm((f) => ({ ...f, address: v }))}
                    error={errors.address}
                    placeholder="Rua, número, complemento"
                    className="sm:col-span-2"
                  />
                  <Input
                    label="Cidade / Estado"
                    value={form.city}
                    onChange={(v) => setForm((f) => ({ ...f, city: v }))}
                    error={errors.city}
                    placeholder="Caçapava / SP"
                    className="sm:col-span-2"
                  />
                </>
              )}
            </div>
          </section>

          {/* Pagamento */}
          <section>
            <h2 className="mb-4 font-display text-2xl text-cream">Forma de pagamento</h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {PAYMENTS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPayment(p.id)}
                  aria-pressed={payment === p.id}
                  className={cn(
                    'cursor-pointer rounded-2xl border p-4 text-left transition-colors',
                    payment === p.id ? 'border-gold-500 bg-gold-500/10' : 'border-line hover:border-cream/40',
                  )}
                >
                  <span className="block text-sm font-medium text-cream">{p.label}</span>
                  <span className="mt-0.5 block text-xs text-muted">{p.note}</span>
                </button>
              ))}
            </div>
            {payment === 'dinheiro' && delivery === 'entrega' && (
              <p className="mt-3 text-xs text-gold-300">
                Pagamento em dinheiro só está disponível para retirada na loja.
              </p>
            )}
          </section>
        </div>

        {/* Resumo */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-line bg-ink-900/60 p-6">
            <h2 className="font-display text-2xl text-cream">Resumo do pedido</h2>

            <ul className="mt-5 space-y-4">
              {lines.map((l) => (
                <li key={l.key} className="flex gap-3">
                  <img src={l.product.image} alt="" className="h-16 w-14 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-cream">{l.product.name}</p>
                    <p className="text-xs text-muted">
                      {l.qty}x · Tam. {l.size} · {l.color}
                    </p>
                  </div>
                  <span className="text-sm text-cream">{formatBRL(l.total)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2 border-t border-line pt-5 text-sm">
              <Row label="Subtotal" value={formatBRL(subtotal)} />
              {pixDiscount > 0 && <Row label="Desconto Pix (5%)" value={`-${formatBRL(pixDiscount)}`} highlight />}
              <Row
                label="Frete"
                value={delivery === 'retirada' ? 'Retirada na loja' : shippingFree ? 'Grátis' : 'A combinar'}
              />
              <div className="flex items-center justify-between border-t border-line pt-3">
                <span className="text-cream/80">Total</span>
                <span className="font-display text-3xl text-cream">{formatBRL(total)}</span>
              </div>
              {delivery === 'entrega' && !shippingFree && (
                <p className="text-xs text-muted-2">+ frete, que combinamos no WhatsApp conforme a região.</p>
              )}
            </div>

            <Button type="submit" variant="primary" size="lg" className="mt-6 w-full">
              <MessageCircle size={17} /> Enviar pedido no WhatsApp
            </Button>
            <p className="mt-3 text-center text-[11px] leading-relaxed text-muted-2">
              Ao enviar, abrimos o WhatsApp com o resumo pronto. Nenhum pagamento é feito pelo site.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={cn('text-muted', highlight && 'text-gold-400')}>{label}</span>
      <span className={cn('text-cream', highlight && 'text-gold-300')}>{value}</span>
    </div>
  );
}

function DeliveryOption({
  active,
  onClick,
  icon,
  title,
  text,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'flex cursor-pointer items-start gap-3 rounded-2xl border p-4 text-left transition-colors',
        active ? 'border-gold-500 bg-gold-500/10' : 'border-line hover:border-cream/40',
      )}
    >
      <span className={cn('mt-0.5', active ? 'text-gold-400' : 'text-muted')}>{icon}</span>
      <span>
        <span className="block text-sm font-medium text-cream">{title}</span>
        <span className="mt-0.5 block text-xs text-muted">{text}</span>
      </span>
    </button>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  error,
  className,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
}) {
  return (
    <label className={cn('flex flex-col gap-1.5', className)}>
      <span className="text-xs font-medium text-cream/80">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className={cn(
          'h-11 rounded-xl border bg-ink-950/60 px-4 text-sm text-cream placeholder:text-muted-2 focus:outline-none',
          error ? 'border-[#b3402f]' : 'border-line focus:border-gold-500',
        )}
      />
      {error && <span className="text-xs text-[#e0796a]">{error}</span>}
    </label>
  );
}
