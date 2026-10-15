import { MessageCircle } from 'lucide-react';
import { STORE, whatsappLink } from '../../config';

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink(`Olá! Vim pelo site da ${STORE.name} e quero saber mais sobre as peças.`)}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar com a loja no WhatsApp"
      className="group fixed bottom-6 right-6 z-[55] hidden items-center gap-0 overflow-hidden rounded-full border border-gold-500/40 bg-ink-800/90 py-3 pl-3 pr-3 text-cream shadow-soft backdrop-blur transition-all duration-300 hover:border-gold-500 hover:pr-5 lg:flex"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-500 text-ink-950">
        <MessageCircle size={18} />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:max-w-[220px] group-hover:opacity-100">
        Fale com a gente
      </span>
    </a>
  );
}
