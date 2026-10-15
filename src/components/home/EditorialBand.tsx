import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { STORE } from '../../config';
import { buttonClasses } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

const PILLARS = [
  'Curadoria peça por peça, feita por quem usa',
  'Nacionais e importados na mesma vitrine',
  'Atendimento humano pelo WhatsApp',
  'Enviamos para todo o Brasil',
];

export function EditorialBand() {
  return (
    <section className="border-y border-line bg-ink-900 cv-auto">
      <div className="container-x grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
        <Reveal className="order-2 lg:order-1">
          <p className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-500">
            <span className="h-px w-8 bg-gold-500/70" />
            Quem somos
          </p>
          <h2 className="font-display text-3xl leading-tight text-cream text-balance sm:text-4xl lg:text-5xl">
            A multimarcas que traduz o que está acontecendo nas ruas
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
            O <strong className="font-semibold text-cream">{STORE.name}</strong> nasceu em {STORE.city}/{STORE.state} para
            juntar, em um só lugar, o melhor do casual nacional e o que a gente garimpa lá fora. Cada peça entra na loja
            depois de passar pela mão do nosso time — se não vestiria bem em nós, não vai para a arara.
          </p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {PILLARS.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-cream/85">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-500/15 text-gold-400">
                  <Check size={12} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/sobre" className={buttonClasses('primary', 'md')}>
              Conhecer a loja <ArrowRight size={16} />
            </Link>
            <Link to="/loja" className={buttonClasses('ghost', 'md')}>
              Ver a coleção
            </Link>
          </div>
        </Reveal>

        <Reveal delay={120} className="order-1 lg:order-2">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-line">
              <img
                src="/brand/hero-rack.webp"
                alt="Arara de roupas da loja Drop Multimarcas"
                loading="lazy"
                className="aspect-[4/3] w-full object-cover lg:aspect-[5/6]"
              />
            </div>
            <div className="absolute -bottom-5 -left-2 hidden w-44 rounded-2xl border border-line bg-ink-850/95 p-4 shadow-soft backdrop-blur sm:block lg:-left-6">
              <p className="font-display text-3xl leading-none text-gold-300">+2.000</p>
              <p className="mt-1 text-xs text-muted">peças já passaram pela loja este ano</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
