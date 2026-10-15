import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '../ui/Reveal';

const BANNERS = [
  {
    eyebrow: 'Combinação pronta',
    title: 'Looks completos',
    text: 'Monte o visual inteiro sem esforço — a gente já selecionou as peças que conversam entre si.',
    cta: 'Ver looks',
    href: '/loja?categoria=looks',
    image: '/brand/hero-look.webp',
  },
  {
    eyebrow: 'Feminino',
    title: 'Para ela',
    text: 'Do casual ao arrumado: tops, bolsas e peças que valorizam qualquer produção.',
    cta: 'Ver feminino',
    href: '/loja?categoria=feminino',
    image: '/feed/ig12.webp',
  },
];

export function PromoBanners() {
  return (
    <section className="container-x cv-auto py-4 lg:py-8">
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
        {BANNERS.map((banner, i) => (
          <Reveal key={banner.title} delay={i * 100}>
            <Link
              to={banner.href}
              className="group relative block aspect-[16/11] overflow-hidden rounded-2xl border border-line lg:aspect-[16/10]"
            >
              <img
                src={banner.image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-400">{banner.eyebrow}</p>
                <h3 className="mt-2 font-display text-3xl text-cream sm:text-4xl">{banner.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/75">{banner.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">
                  {banner.cta}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
