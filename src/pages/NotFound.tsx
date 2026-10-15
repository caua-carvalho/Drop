import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { buttonClasses } from '../components/ui/Button';

export function NotFound() {
  return (
    <div className="container-x flex flex-col items-center justify-center gap-6 py-24 text-center lg:py-32">
      <span className="grid h-20 w-20 place-items-center rounded-full border border-line text-gold-500">
        <Compass size={34} />
      </span>
      <div>
        <p className="font-display text-6xl text-gold-500">404</p>
        <h1 className="mt-2 font-display text-3xl text-cream sm:text-4xl">Página não encontrada</h1>
        <p className="mt-3 max-w-md text-sm text-muted">
          O link que você acessou pode ter mudado ou não existe mais. Que tal dar uma olhada na coleção?
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link to="/" className={buttonClasses('primary', 'lg')}>
          Voltar para o início
        </Link>
        <Link to="/loja" className={buttonClasses('outline', 'lg')}>
          Ver a loja
        </Link>
      </div>
    </div>
  );
}
