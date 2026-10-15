import { CreditCard, MapPin, RefreshCcw, Truck } from 'lucide-react';
import { STORE } from '../../config';
import { Reveal } from '../ui/Reveal';

const ITEMS = [
  {
    icon: Truck,
    title: 'Enviamos para todo o Brasil',
    text: `Frete grátis em compras acima de R$ ${STORE.freeShippingFrom}.`,
  },
  {
    icon: MapPin,
    title: `Loja física em ${STORE.city}/${STORE.state}`,
    text: 'Venha provar pessoalmente. ' + STORE.openingHours + '.',
  },
  {
    icon: CreditCard,
    title: 'Pague como quiser',
    text: 'Pix, cartão em até 3x sem juros ou combine no WhatsApp.',
  },
  {
    icon: RefreshCcw,
    title: 'Troca facilitada',
    text: 'Primeira troca de tamanho por nossa conta.',
  },
];

export function Benefits() {
  return (
    <section className="container-x cv-auto py-14 lg:py-16" aria-label="Vantagens">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item, i) => (
          <Reveal key={item.title} delay={i * 70}>
            <div className="flex h-full items-start gap-4 rounded-2xl border border-line bg-ink-900/60 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400">
                <item.icon size={19} />
              </span>
              <div>
                <h3 className="font-sans text-sm font-semibold text-cream">{item.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted">{item.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
