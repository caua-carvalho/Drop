import { InstagramIcon } from '../ui/icons';
import { STORE } from '../../config';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';

const FEED = Array.from({ length: 8 }, (_, i) => `/feed/ig${String(i + 1).padStart(2, '0')}.webp`);

export function InstagramFeed() {
  return (
    <section className="container-x cv-auto py-14 lg:py-20" aria-label="Instagram da loja">
      <SectionHeading
        align="center"
        eyebrow="Siga a loja"
        title={
          <span className="inline-flex items-center gap-3">
            <InstagramIcon size={28} className="text-gold-500" />@{STORE.instagram}
          </span>
        }
        description="Novidades, looks e bastidores direto do Instagram. Marque a gente usando #DropMultimarcas."
      />

      <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:mt-10 lg:gap-3">
        {FEED.map((src, i) => (
          <Reveal key={src} delay={i * 40}>
            <a
              href={STORE.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative block aspect-square overflow-hidden rounded-xl border border-line"
            >
              <img
                src={src}
                alt={`Publicação do Instagram @${STORE.instagram}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute inset-0 grid place-items-center bg-ink-950/60 opacity-0 transition-opacity group-hover:opacity-100">
                <InstagramIcon size={26} className="text-cream" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href={STORE.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium text-gold-300 transition-colors hover:text-gold-200"
        >
          <InstagramIcon size={17} /> Seguir @{STORE.instagram}
        </a>
      </div>
    </section>
  );
}
