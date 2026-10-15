import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Truck } from 'lucide-react';
import { STORE, whatsappLink } from '../../config';
import { buttonClasses } from '../ui/Button';

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950" aria-label="Destaque">
      {/* Imagem de fundo */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/brand/hero-apparel.webp"
          alt=""
          className="h-full w-full object-cover object-center opacity-70 lg:opacity-80"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/40 lg:bg-gradient-to-r lg:from-ink-950 lg:via-ink-950/85 lg:to-ink-950/10" />
      </div>

      <div className="container-x flex min-h-[76vh] flex-col justify-end pb-12 pt-16 sm:min-h-[82vh] lg:min-h-[88vh] lg:justify-center lg:pb-24 lg:pt-24">
        <div className="max-w-2xl">
          <p className="mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-400">
            <span className="h-px w-8 bg-gold-500/70" />
            {STORE.addressLine}
          </p>

          <h1 className="font-display text-[2.75rem] leading-[1.03] text-cream text-balance sm:text-6xl lg:text-7xl">
            Seu estilo,
            <span className="gold-text block">nossa curadoria.</span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-cream/75 sm:text-base lg:text-lg">
            Roupas e acessórios <strong className="font-semibold text-cream">nacionais e importados</strong>, escolhidos
            peça por peça. Compre pelo site ou feche o pedido direto no WhatsApp.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link to="/loja" className={buttonClasses('primary', 'lg', 'w-full sm:w-auto')}>
              Ver coleção <ArrowRight size={17} />
            </Link>
            <a
              href={whatsappLink(`Olá! Vim pelo site da ${STORE.name} e quero ver as novidades.`)}
              target="_blank"
              rel="noreferrer"
              className={buttonClasses('outline', 'lg', 'w-full backdrop-blur-sm sm:w-auto')}
            >
              <MessageCircle size={17} /> Falar no WhatsApp
            </a>
          </div>

          <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-cream/70">
            <li className="flex items-center gap-2">
              <Truck size={15} className="text-gold-500" /> {STORE.ships}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" /> Loja física em {STORE.city}/{STORE.state}
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500" /> Frete grátis acima de R$ {STORE.freeShippingFrom}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
