import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../../data/products';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';

export function CategoryStrip() {
  return (
    <section className="container-x py-14 lg:py-20" aria-label="Categorias">
      <SectionHeading
        eyebrow="Explore por categoria"
        title="Encontre seu próximo look"
        description="Do básico ao importado — navegue pelas categorias que mais saem da loja."
      />

      <div className="mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 no-scrollbar lg:mt-10 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible xl:grid-cols-7">
        {CATEGORIES.map((cat, i) => (
          <Reveal key={cat.id} delay={i * 60} className="w-[42%] shrink-0 snap-start sm:w-[30%] lg:w-auto">
            <Link
              to={`/loja?categoria=${cat.id}`}
              className="group relative block aspect-[3/4] overflow-hidden rounded-2xl border border-line"
            >
              <img
                src={cat.image}
                alt={cat.label}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3.5">
                <span className="font-display text-lg leading-tight text-cream lg:text-xl">{cat.label}</span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/25 text-cream transition-colors group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-ink-950">
                  <ArrowUpRight size={15} />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
