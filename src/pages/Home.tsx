import { useEffect, useState } from 'react';
import { BannerSlider } from '../components/home/BannerSlider';
import { BrandStrip } from '../components/home/BrandStrip';
import { CategoryStrip } from '../components/home/CategoryStrip';
import { ProductGridSection } from '../components/home/ProductGridSection';
import { InstagramStrip } from '../components/home/InstagramStrip';
import { PRODUCTS } from '../data/products';
import { GridSkeleton, Skeleton } from '../components/ui/Skeleton';

/** Ordena por vendas (avaliação + nº de reviews). */
const byBestSellers = [...PRODUCTS].sort((a, b) => b.reviews * b.rating - a.reviews * a.rating);

const bestSellers = byBestSellers.slice(0, 12);
const promos = PRODUCTS.filter((p) => p.compareAt).slice(0, 8);
const camisetas = PRODUCTS.filter((p) => p.category === 'camisetas').slice(0, 8);
const lancamentos = PRODUCTS.filter((p) => p.badge === 'Novo').slice(0, 8);
const conjuntos = PRODUCTS.filter((p) => p.category === 'conjuntos');
const feminino = PRODUCTS.filter((p) => p.category === 'feminino');
const calcados = PRODUCTS.filter((p) => p.category === 'calcados');
const acessorios = PRODUCTS.filter((p) => p.category === 'acessorios');

export function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setIsLoading(false), 180);
    return () => window.clearTimeout(id);
  }, []);

  if (isLoading) {
    return (
      <>
        <Skeleton className="h-[calc(100svh-7.5rem-env(safe-area-inset-bottom,0px))] min-h-[320px] max-h-[560px] w-full lg:h-[calc(100svh-5rem)] lg:max-h-[640px]" />
        <div className="container-x py-12 lg:py-16">
          <GridSkeleton count={4} />
        </div>
        <div className="container-x">
          <GridSkeleton count={4} />
        </div>
        <div className="container-x py-10 lg:py-14">
          <GridSkeleton count={8} />
        </div>
        <div className="container-x py-10 lg:py-14">
          <GridSkeleton count={8} />
        </div>
      </>
    );
  }

  return (
    <>
      <BannerSlider />
      <div className="container-x">
        <BrandStrip />
      </div>
      <CategoryStrip />

      <ProductGridSection
        eyebrow="Mais desejados"
        title="Mais vendidos"
        products={bestSellers}
        ctaHref="/loja?ordenar=destaques"
      />
      <ProductGridSection
        eyebrow="Só até acabar"
        title="Promoções"
        products={promos}
        ctaHref="/loja?promo=1"
        ctaLabel="Ver todas"
      />
      <ProductGridSection
        eyebrow="Do básico ao statement"
        title="Camisetas"
        products={camisetas}
        ctaHref="/loja?categoria=camisetas"
      />
      <ProductGridSection
        eyebrow="Chegou agora"
        title="Lançamentos"
        products={lancamentos}
        ctaHref="/loja?ordenar=novidades"
      />
      <ProductGridSection
        eyebrow="Peças que conversam"
        title="Conjuntos"
        products={conjuntos}
        ctaHref="/loja?categoria=conjuntos"
      />
      <ProductGridSection eyebrow="Seleção" title="Feminino" products={feminino} ctaHref="/loja?categoria=feminino" />
      <ProductGridSection
        eyebrow="Pise diferente"
        title="Calçados"
        products={calcados}
        ctaHref="/loja?categoria=calcados"
      />
      <ProductGridSection
        eyebrow="Detalhes que fecham o look"
        title="Acessórios"
        products={acessorios}
        ctaHref="/loja?categoria=acessorios"
      />

      <InstagramStrip />
    </>
  );
}
