import { InstagramIcon } from '../ui/icons';
import { STORE } from '../../config';

const FEED = ['/feed/ig01.webp', '/feed/ig09.webp', '/feed/ig17.webp', '/feed/ig25.webp'];

/** Faixa compacta de Instagram no fim da home (sem tomar espaço do catálogo). */
export function InstagramStrip() {
  return (
    <section className="container-x cv-auto pb-14 lg:pb-16" aria-label="Instagram da loja">
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-8">
        <a
          href={STORE.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-cream transition-colors hover:text-gold-300"
        >
          <InstagramIcon size={18} className="text-gold-500" /> @{STORE.instagram}
        </a>
        <div className="grid flex-1 grid-cols-4 gap-2 sm:max-w-md sm:gap-2.5">
          {FEED.map((src) => (
            <a
              key={src}
              href={STORE.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group block aspect-square overflow-hidden rounded-lg border border-line"
              aria-label="Ver Instagram da loja"
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
