# Drop Multimarcas — Loja (front-end)

Protótipo de e-commerce de roupas e acessórios para a **Drop Multimarcas** (loja física em
Caçapava/SP). Aplicação **front-end only** (sem back-end), feita para demonstrar a experiência
completa da loja: vitrine, filtros, página de produto, carrinho, favoritos e checkout simulado
via WhatsApp.

## Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **react-router-dom** v7
- **zustand** (carrinho e favoritos, persistidos em `localStorage`)
- **lucide-react** (ícones)

## Como rodar

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção (tsc + vite build)
npm run preview  # serve o build de produção
npm run lint     # oxlint
```

## Estrutura

```
src/
  components/
    home/      # seções da home (Hero, rails de produtos, editorial, feed, etc.)
    layout/    # Header, Footer, CartDrawer, SearchOverlay, MobileTabBar...
    product/   # ProductCard
    ui/        # primitivos (Button, Badge, Price, Stars, Reveal...)
  data/        # catálogo mockado (produtos, categorias, cores, tamanhos)
  pages/       # rotas (Home, Catalog, ProductDetail, Favorites, About, Checkout, 404)
  store/       # stores zustand (carrinho, favoritos, UI)
  config.ts    # dados da loja (WhatsApp, Instagram, frete grátis...)
public/
  brand/       # logo, ícones, imagens de hero
  products/    # fotos dos produtos (webp)
  feed/        # imagens do Instagram (webp)
  fonts/       # Montserrat (variável, self-hosted)
```

## Identidade visual

- Base **preto puro** + accent **dourado** (`#c9a961`, extraído do logo).
- Tipografia **Montserrat** em toda a interface (títulos em caixa alta e peso 800).
- Foco em performance: imagens em WebP, code-splitting por rota, `content-visibility`,
  fontes self-hosted e `preload` do hero.

## Checkout

Não há back-end. Ao finalizar, o pedido é montado e enviado como link pré-preenchido do
**WhatsApp** da loja (`wa.me`), e o carrinho é limpo. Os dados da loja ficam em `src/config.ts`.

## Aviso

As imagens são meramente ilustrativas (créditos ao Unsplash) e o catálogo é fictício,
usado apenas para demonstração.
