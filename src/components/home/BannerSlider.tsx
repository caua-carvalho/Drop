import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/format';
import { STORE } from '../../config';

type Slide = {
  image: string;
  eyebrow: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  position?: string;
};

const SLIDES: Slide[] = [
  {
    image: '/feed/ig01.webp',
    eyebrow: 'Nova estação',
    title: 'A coleção chegou',
    text: 'Camisetas, moletons e conjuntos nacionais e importados — curadoria peça por peça.',
    cta: 'Ver coleção',
    href: '/loja',
    position: 'object-center',
  },
  {
    image: '/feed/ig02.webp',
    eyebrow: 'Combinação pronta',
    title: 'Looks completos',
    text: 'Monte o visual inteiro sem esforço — a gente já selecionou as peças que conversam entre si.',
    cta: 'Ver looks',
    href: '/loja?categoria=looks',
    position: 'object-center',
  },
  {
    image: '/feed/ig03.webp',
    eyebrow: 'Só por hoje',
    title: 'Promoções da semana',
    text: 'Peças selecionadas com desconto de até 50%. Enquanto durar o estoque.',
    cta: 'Ver promoções',
    href: '/loja?promo=1',
    position: 'object-top',
  },
];

const INTERVAL = 5200;

export function BannerSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (paused || reducedMotion.current) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => window.clearInterval(timer);
  }, [paused]);

  const go = (next: number) => setIndex((next + SLIDES.length) % SLIDES.length);

  // Touch swipe para mobile
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isSwipingHorizontal = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwipingHorizontal.current = false;
    setPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) {
      isSwipingHorizontal.current = true;
      // Evita arrastar o viewport ao fazer swipe horizontal
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - touchStartX.current;
    if (isSwipingHorizontal.current && Math.abs(diff) > 50) {
      if (diff > 0) {
        go(index - 1);
      } else {
        go(index + 1);
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    isSwipingHorizontal.current = false;
    setPaused(false);
  };

  return (
    <section
      aria-label="Destaques"
      className="relative isolate overflow-hidden bg-ink-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/*
        Altura controlada por `.hero-viewport` (em index.css): viewport menos
        header e, no mobile, menos a barra fixa inferior. Nunca ultrapassa a tela.
      */}
      <div
        className="relative hero-viewport"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <h1 className="sr-only">
          {STORE.name} — {STORE.tagline}
        </h1>
        {SLIDES.map((slide, i) => (
          <div
            key={slide.href}
            aria-hidden={i !== index}
            className={cn(
              'absolute inset-0 transition-opacity duration-700 ease-out',
              i === index ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
          >
            <img
              src={slide.image}
              alt=""
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'low'}
              className={cn('h-full w-full object-cover', slide.position ?? 'object-center')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/20 lg:bg-gradient-to-r lg:from-ink-950 lg:via-ink-950/70 lg:to-transparent" />
          </div>
        ))}

        {/* Texto dos slides: todos sobrepostos na MESMA posição (centralizados),
            para que o texto não "pule" entre topo/meio/baixo ao trocar o banner.
            No mobile fica ancorado embaixo (melhor contraste sobre a foto);
            no desktop, centralizado. */}
        {SLIDES.map((slide, i) => (
          <div
            key={slide.title}
            aria-hidden={i !== index}
            className={cn(
              'container-x absolute inset-0 flex flex-col justify-center pb-16 pt-8 transition-all duration-500 ease-out lg:pb-8',
              i === index ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
            )}
          >
            <div className="max-w-xl">
              <p className="mb-2 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-400 sm:mb-3">
                <span className="h-px w-8 bg-gold-500/70" />
                {slide.eyebrow}
              </p>
              <h2 className="font-display text-3xl leading-[1.05] text-cream text-balance sm:text-4xl lg:text-5xl xl:text-6xl">
                {slide.title}
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-cream/75 sm:mt-4 sm:text-base">
                {slide.text}
              </p>
              <Link
                to={slide.href}
                className="mt-5 inline-flex h-12 items-center gap-2 rounded-lg bg-gold-500 px-8 text-xs font-bold uppercase tracking-[0.14em] text-ink-950 shadow-[0_12px_40px_-16px_rgba(201,169,97,0.55)] transition-colors hover:bg-gold-400 sm:mt-6"
              >
                {slide.cta} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}

        {/* Controles */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 lg:left-auto lg:right-8 lg:translate-x-0">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Banner anterior"
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-white/20 text-cream transition-colors hover:border-gold-500 hover:text-gold-300"
          >
            <ChevronLeft size={17} />
          </button>
          <div className="flex items-center gap-2">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => go(i)}
                aria-label={`Ir para banner ${i + 1}`}
                aria-current={i === index}
                className={cn(
                  'h-1.5 cursor-pointer rounded-full transition-all duration-300',
                  i === index ? 'w-7 bg-gold-500' : 'w-1.5 bg-white/35 hover:bg-white/60',
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Próximo banner"
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-white/20 text-cream transition-colors hover:border-gold-500 hover:text-gold-300"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}
