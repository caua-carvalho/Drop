import { Link } from 'react-router-dom';
import { MapPin, MessageCircle, Truck } from 'lucide-react';
import { InstagramIcon } from '../ui/icons';
import { STORE, whatsappLink } from '../../config';
import { CATEGORIES } from '../../data/products';

const INSTITUTIONAL = [
  { label: 'Sobre a loja', to: '/sobre' },
  { label: 'Loja completa', to: '/loja' },
  { label: 'Favoritos', to: '/favoritos' },
  { label: 'Trocas e devoluções', to: '/sobre#trocas' },
  { label: 'Formas de pagamento', to: '/sobre#pagamento' },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-900 pb-safe lg:pb-0">
      <div className="container-x grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-3">
            <img src="/brand/logo.webp" alt="" width={48} height={48} className="h-12 w-12 object-contain" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-2xl text-cream">Drop</span>
              <span className="text-[10px] uppercase tracking-[0.42em] text-gold-500">Multimarcas</span>
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            Roupas e acessórios nacionais e importados, com curadoria de quem entende de moda. {STORE.addressLine}.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={STORE.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Instagram @${STORE.instagram}`}
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-cream transition-colors hover:border-gold-500 hover:text-gold-300"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href={whatsappLink('Olá! Vim pelo site e preciso de ajuda.')}
              target="_blank"
              rel="noreferrer"
              aria-label="Falar no WhatsApp"
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-cream transition-colors hover:border-gold-500 hover:text-gold-300"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        <nav aria-label="Categorias">
          <h3 className="font-display text-lg text-cream">Categorias</h3>
          <ul className="mt-4 space-y-2.5">
            {CATEGORIES.map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/loja?categoria=${cat.id}`}
                  className="text-sm text-muted transition-colors hover:text-gold-300"
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Institucional">
          <h3 className="font-display text-lg text-cream">Institucional</h3>
          <ul className="mt-4 space-y-2.5">
            {INSTITUTIONAL.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-sm text-muted transition-colors hover:text-gold-300">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-display text-lg text-cream">Atendimento</h3>
          <ul className="mt-4 space-y-3.5 text-sm text-muted">
            <li className="flex items-start gap-3">
              <MessageCircle size={17} className="mt-0.5 shrink-0 text-gold-500" />
              <a
                href={whatsappLink('Olá! Vim pelo site.')}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-gold-300"
              >
                {STORE.whatsappLabel}
                <span className="block text-xs text-muted-2">WhatsApp</span>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={17} className="mt-0.5 shrink-0 text-gold-500" />
              <span>
                {STORE.city} — {STORE.state}
                <span className="block text-xs text-muted-2">{STORE.openingHours}</span>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Truck size={17} className="mt-0.5 shrink-0 text-gold-500" />
              <span>
                {STORE.ships}
                <span className="block text-xs text-muted-2">Frete grátis acima de R$ {STORE.freeShippingFrom}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-2 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {STORE.name}. Todos os direitos reservados.
          </p>
          <p className="text-center sm:text-right">
            Protótipo de e-commerce · imagens meramente ilustrativas
          </p>
        </div>
      </div>
    </footer>
  );
}
