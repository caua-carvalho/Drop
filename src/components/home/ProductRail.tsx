import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS, type Product } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { buttonClasses } from '../ui/Button';

export function ProductRail({
  eyebrow,
  title,
  description,
  products,
  ctaHref = '/loja',
  ctaLabel = 'Ver tudo',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  products: Product[];
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <section className="container-x cv-auto py-14 lg:py-20">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
        action={
          <Link to={ctaHref} className={buttonClasses('outline', 'md', 'group')}>
            {ctaLabel}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        }
      />

      <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 no-scrollbar lg:mt-10 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible">
        {products.map((product, i) => (
          <Reveal key={product.id} delay={i * 50} className="w-[68%] shrink-0 snap-start sm:w-[42%] lg:w-auto">
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function FeaturedProducts() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8);
  return (
    <ProductRail
      eyebrow="Mais desejados"
      title="Destaques da coleção"
      description="As peças que mais saem da loja — clique e garanta a sua antes que acabe."
      products={featured}
      ctaHref="/loja?ordenar=destaques"
    />
  );
}

export function NewArrivals() {
  const news = PRODUCTS.filter((p) => p.badge === 'Novo' || p.rating >= 4.8).slice(0, 8);
  return (
    <ProductRail
      eyebrow="Chegou agora"
      title="Novidades da semana"
      description="Reposição e peças novas chegando toda semana, direto da nossa arara."
      products={news}
      ctaHref="/loja?ordenar=novidades"
      ctaLabel="Ver novidades"
    />
  );
}
