export type CategoryId =
  | 'camisetas'
  | 'camisas'
  | 'calcas'
  | 'feminino'
  | 'acessorios'
  | 'calcados'
  | 'looks';

export type ProductColor = {
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: CategoryId;
  price: number;
  compareAt?: number;
  image: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  rating: number;
  reviews: number;
  badge?: 'Novo' | 'Promoção' | 'Mais vendido';
  shortDescription: string;
  description: string;
  details: string[];
  featured?: boolean;
};

export const CATEGORIES: { id: CategoryId; label: string; image: string }[] = [
  { id: 'camisetas', label: 'Camisetas', image: '/products/tee-white.webp' },
  { id: 'camisas', label: 'Camisas', image: '/products/shirt-white.webp' },
  { id: 'calcas', label: 'Calças', image: '/products/jeans-belt.webp' },
  { id: 'feminino', label: 'Feminino', image: '/products/women-top.webp' },
  { id: 'acessorios', label: 'Acessórios', image: '/products/belt.webp' },
  { id: 'calcados', label: 'Calçados', image: '/products/sneaker.webp' },
  { id: 'looks', label: 'Looks', image: '/products/look-tee.webp' },
];

const CO = {
  preto: { name: 'Preto', hex: '#141414' },
  branco: { name: 'Branco', hex: '#f4f1ea' },
  offwhite: { name: 'Off-white', hex: '#e7e0d2' },
  cinza: { name: 'Cinza', hex: '#6f6f73' },
  bege: { name: 'Bege', hex: '#cbb89a' },
  caramelo: { name: 'Caramelo', hex: '#9a6b3f' },
  verde: { name: 'Verde', hex: '#3f5d4a' },
  azul: { name: 'Azul', hex: '#2b3a55' },
  vinho: { name: 'Vinho', hex: '#5a2430' },
} satisfies Record<string, ProductColor>;

const APPAREL = ['P', 'M', 'G', 'GG'];
const SHOES = ['38', '39', '40', '41', '42', '43'];
const ONE = ['Único'];

const FEED = Array.from({ length: 29 }, (_, i) => `/feed/ig${String(i + 1).padStart(2, '0')}.webp`);

/** Galeria de demonstração: imagem principal + 2 imagens de lifestyle. */
function gallery(main: string, seed: number): string[] {
  return [main, FEED[seed % FEED.length], FEED[(seed * 7 + 5) % FEED.length]];
}

type Seed = Omit<Product, 'id' | 'slug' | 'images'>;

const SEEDS: Seed[] = [
  {
    name: 'Camiseta Oversized Branca',
    brand: 'Drop',
    category: 'camisetas',
    price: 89.9,
    compareAt: 119.9,
    image: '/products/tee-white.webp',
    colors: [CO.branco, CO.preto, CO.offwhite],
    sizes: APPAREL,
    rating: 4.8,
    reviews: 64,
    badge: 'Mais vendido',
    featured: true,
    shortDescription: 'Algodão pesado com caimento amplo e toque macio.',
    description:
      'A camiseta que virou assinatura da loja. Modelagem oversized, ombro caído e algodão de gramatura alta para não perder o formato depois da lavagem.',
    details: [
      '100% algodão penteado — 180g/m²',
      'Modelagem oversized com ombro caído',
      'Gola reforçada com ribana',
      'Lavagem a frio, do avesso',
    ],
  },
  {
    name: 'Camiseta Básica Preta',
    brand: 'Drop',
    category: 'camisetas',
    price: 79.9,
    image: '/products/tee-black.webp',
    colors: [CO.preto, CO.branco, CO.cinza],
    sizes: APPAREL,
    rating: 4.7,
    reviews: 51,
    featured: true,
    shortDescription: 'O básico que resolve qualquer produção.',
    description:
      'Corte clássico, sem estampa e com acabamento fino. Uma peça curinga para o dia a dia e para compor com sobreposições.',
    details: ['Algodão 100% — 165g/m²', 'Corte tradicional', 'Punho e gola em ribana', 'Disponível em cores neutras'],
  },
  {
    name: 'Camiseta Bicolor Premium',
    brand: 'Verso',
    category: 'camisetas',
    price: 99.9,
    image: '/products/tee-bicolor.webp',
    colors: [CO.preto, CO.branco, CO.vinho],
    sizes: APPAREL,
    rating: 4.6,
    reviews: 28,
    shortDescription: 'Detalhe contrastante para sair do óbvio.',
    description:
      'Camiseta com manga e barra em contraste, pensada para quem gosta de um básico com personalidade.',
    details: ['Mistura algodão e elastano', 'Detalhes contrastantes', 'Modelagem regular', 'Não desbota na lavagem'],
  },
  {
    name: 'Camiseta Estampada Art',
    brand: 'Lume',
    category: 'camisetas',
    price: 109.9,
    compareAt: 139.9,
    image: '/products/tee-print.webp',
    colors: [CO.branco, CO.preto],
    sizes: APPAREL,
    rating: 4.9,
    reviews: 37,
    badge: 'Novo',
    featured: true,
    shortDescription: 'Estampa exclusiva com toque artístico.',
    description:
      'Peça de tiragem limitada com estampa desenvolvida em estúdio. Uma camiseta para quem quer um look autoral.',
    details: ['Estampa exclusiva da coleção', 'Algodão premium', 'Modelagem regular', 'Tiragem limitada'],
  },
  {
    name: 'Camiseta Manga Longa Branca',
    brand: 'Drop',
    category: 'camisetas',
    price: 119.9,
    image: '/products/tee-longsleeve.webp',
    colors: [CO.branco, CO.preto, CO.offwhite],
    sizes: APPAREL,
    rating: 4.5,
    reviews: 19,
    shortDescription: 'Camada extra para meia-estação.',
    description:
      'Manga longa de caimento reto, ideal para usar sozinha ou por baixo de jaquetas e coletes.',
    details: ['Algodão com toque macio', 'Manga longa com punho', 'Corte reto', 'Versátil para sobreposição'],
  },
  {
    name: 'Camiseta Pima Cotton',
    brand: 'Áurea',
    category: 'camisetas',
    price: 129.9,
    image: '/products/tee-basic-white.webp',
    colors: [CO.branco, CO.preto, CO.bege],
    sizes: APPAREL,
    rating: 4.9,
    reviews: 82,
    badge: 'Mais vendido',
    featured: true,
    shortDescription: 'Algodão pima: mais brilho e durabilidade.',
    description:
      'A up-grade da camiseta básica. O algodão pima entrega toque sedoso, cor mais viva e muito mais resistência.',
    details: ['Algodão pima de fibra extra-longa', 'Toque sedoso e fresquinho', 'Corte regular', 'Acabamento premium'],
  },
  {
    name: 'Camiseta Minimal Off-White',
    brand: 'Drop',
    category: 'camisetas',
    price: 84.9,
    image: '/products/tee-flat.webp',
    colors: [CO.offwhite, CO.branco, CO.preto],
    sizes: APPAREL,
    rating: 4.4,
    reviews: 23,
    shortDescription: 'Clean, sem logo, feita para durar.',
    description:
      'Fotografada do jeito que você vai receber: sem estampa, sem enrolação. Uma base perfeita para qualquer combinação.',
    details: ['Sem estampa', 'Algodão de boa gramatura', 'Modelagem regular', 'Costura reforçada'],
  },
  {
    name: 'Camiseta Drop Essential',
    brand: 'Drop',
    category: 'camisetas',
    price: 74.9,
    image: '/products/tee-wall.webp',
    colors: [CO.branco, CO.preto],
    sizes: APPAREL,
    rating: 4.5,
    reviews: 16,
    shortDescription: 'O essencial da marca, no melhor preço.',
    description:
      'Peça de entrada da linha Drop. Simples, honesta e com a qualidade que a gente cobra em todas as camisetas.',
    details: ['Algodão 100%', 'Corte regular', 'Gola em ribana', 'Ótimo custo-benefício'],
  },
  {
    name: 'Look Street Masculino',
    brand: 'Drop',
    category: 'looks',
    price: 249.9,
    image: '/products/look-tee.webp',
    colors: [CO.branco, CO.preto],
    sizes: APPAREL,
    rating: 4.8,
    reviews: 41,
    featured: true,
    shortDescription: 'Camiseta + calça: combinação pronta.',
    description:
      'Seleção de duas peças que já combinam entre si. Chega pronto para usar, sem precisar pensar na produção.',
    details: ['Composição de 2 peças', 'Combinação assinada pelo time da loja', 'Disponível em peças avulsas', 'Consulte tamanhos'],
  },
  {
    name: 'Look Casual com Boné',
    brand: 'Kinetic',
    category: 'looks',
    price: 289.9,
    image: '/products/look-cap.webp',
    colors: [CO.azul, CO.branco, CO.preto],
    sizes: APPAREL,
    rating: 4.7,
    reviews: 22,
    badge: 'Novo',
    shortDescription: 'Camiseta, boné e o jeans certo.',
    description:
      'Look completo para o fim de semana: peça de cima, acessório e a parte de baixo já resolvidos pelo nosso time.',
    details: ['Composição de 3 peças', 'Boné ajustável', 'Peças podem ser trocadas', 'Enviamos para todo o Brasil'],
  },
  {
    name: 'Camiseta Floral Verão',
    brand: 'Lume',
    category: 'camisetas',
    price: 99.9,
    image: '/products/look-floral.webp',
    colors: [CO.preto, CO.vinho],
    sizes: APPAREL,
    rating: 4.6,
    reviews: 30,
    shortDescription: 'Estampa floral com atitude.',
    description:
      'Estampa vibrante em fundo escuro, do jeito que o verão pede. Combina com jeans claro e tênis branco.',
    details: ['Estampa floral exclusiva', 'Tecido leve e respirável', 'Modelagem regular', 'Ideal para dias quentes'],
  },
  {
    name: 'Look Jeans & Camisa',
    brand: 'Verso',
    category: 'looks',
    price: 319.9,
    image: '/products/look-shirt-jeans.webp',
    colors: [CO.branco, CO.azul],
    sizes: APPAREL,
    rating: 4.8,
    reviews: 18,
    shortDescription: 'Camisa + jeans, equilíbrio perfeito.',
    description:
      'Combinação clássica repensada: camisa de caimento solto com a calça jeans de corte moderno.',
    details: ['Composição de 2 peças', 'Camisa de algodão', 'Jeans com leve elastano', 'Peças vendidas juntas ou avulsas'],
  },
  {
    name: 'Look Social Casual',
    brand: 'Áurea',
    category: 'looks',
    price: 359.9,
    image: '/products/look-white-shirt.webp',
    colors: [CO.branco, CO.preto],
    sizes: APPAREL,
    rating: 4.9,
    reviews: 26,
    featured: true,
    shortDescription: 'Para o compromisso que pede elegância.',
    description:
      'Do trabalho ao happy hour sem trocar de roupa. Peças versáteis que funcionam juntas e separadas.',
    details: ['Composição de 2 peças', 'Acabamento social', 'Alinha elegância e conforto', 'Ideal para meia-estação'],
  },
  {
    name: 'Top Feminino Canelado',
    brand: 'Lume',
    category: 'feminino',
    price: 89.9,
    image: '/products/women-top.webp',
    colors: [CO.branco, CO.preto, CO.bege],
    sizes: APPAREL,
    rating: 4.7,
    reviews: 45,
    featured: true,
    shortDescription: 'Canelado que valoriza a silhueta.',
    description:
      'Top de tecido canelado com toque macio e caimento justo sem apertar. Ótimo para composições em camadas.',
    details: ['Tecido canelado com elastano', 'Modelagem ajustada', 'Sem transparência', 'Disponível em cores neutras'],
  },
  {
    name: 'Bolsa Transversal Couro',
    brand: 'Áurea',
    category: 'acessorios',
    price: 179.9,
    compareAt: 219.9,
    image: '/products/women-bag.webp',
    colors: [CO.caramelo, CO.preto],
    sizes: ONE,
    rating: 4.8,
    reviews: 33,
    badge: 'Promoção',
    shortDescription: 'Couro com alça ajustável.',
    description:
      'Bolsa transversal compacta, com espaço para o essencial e alça regulável. Um coringa para o dia inteiro.',
    details: ['Couro com acabamento premium', 'Alça ajustável', 'Bolso interno', 'Fecho por zíper'],
  },
  {
    name: 'Camisa Social Branca',
    brand: 'Verso',
    category: 'camisas',
    price: 149.9,
    image: '/products/shirt-white.webp',
    colors: [CO.branco, CO.azul, CO.preto],
    sizes: APPAREL,
    rating: 4.6,
    reviews: 21,
    shortDescription: 'Camisa versátil do casual ao social.',
    description:
      'Camisa de algodão com caimento limpo. Usa por dentro ou por fora — funciona nas duas.',
    details: ['Algodão de toque firme', 'Botões discretos', 'Corte regular', 'Fácil de passar'],
  },
  {
    name: 'Calça Jeans Slim',
    brand: 'Norte',
    category: 'calcas',
    price: 189.9,
    image: '/products/jeans-belt.webp',
    colors: [CO.azul, CO.preto],
    sizes: ['38', '40', '42', '44', '46'],
    rating: 4.8,
    reviews: 58,
    badge: 'Mais vendido',
    featured: true,
    shortDescription: 'Corte slim com leve elastano.',
    description:
      'O jeans que mais sai da loja. Corte slim que acompanha o corpo, com elasticidade na medida para o dia todo.',
    details: ['Jeans com leve elastano', 'Corte slim', 'Lavagem média', 'Cinco bolsos'],
  },
  {
    name: 'Cinto de Couro Legítimo',
    brand: 'Áurea',
    category: 'acessorios',
    price: 79.9,
    image: '/products/belt.webp',
    colors: [CO.caramelo, CO.preto],
    sizes: ONE,
    rating: 4.7,
    reviews: 24,
    shortDescription: 'Acabamento que valoriza o look.',
    description:
      'Cinto de couro legítimo com fivela metálica em tom dourado, o detalhe que fecha qualquer produção.',
    details: ['Couro legítimo', 'Fivela metálica', 'Tamanhos ajustáveis', 'Combina com jeans e alfaiataria'],
  },
  {
    name: 'Tênis Casual Clássico',
    brand: 'Kinetic',
    category: 'calcados',
    price: 299.9,
    compareAt: 379.9,
    image: '/products/sneaker.webp',
    colors: [CO.branco, CO.preto],
    sizes: SHOES,
    rating: 4.9,
    reviews: 71,
    badge: 'Promoção',
    featured: true,
    shortDescription: 'Solado leve e cabedal resistente.',
    description:
      'Tênis casual de linha atemporal, com solado confortável para usar o dia inteiro. Combina com tudo.',
    details: ['Cabedal resistente', 'Solado leve e antiderrapante', 'Palmilha acolchoada', 'Numeração 38 ao 43'],
  },
  {
    name: 'Kit 3 Camisetas Básicas',
    brand: 'Drop',
    category: 'camisetas',
    price: 199.9,
    compareAt: 257.7,
    image: '/products/tees-folded.webp',
    colors: [CO.branco, CO.preto, CO.cinza],
    sizes: APPAREL,
    rating: 4.8,
    reviews: 96,
    badge: 'Promoção',
    shortDescription: 'Três básicos por um preço melhor.',
    description:
      'Escolha três camisetas básicas e pague menos. A forma mais inteligente de completar o guarda-roupa.',
    details: ['3 camisetas por kit', 'Você escolhe as cores', 'Economia em relação à peça avulsa', 'Algodão 100%'],
  },
];

export const PRODUCTS: Product[] = SEEDS.map((seed, index) => {
  const slug = seed.name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return {
    ...seed,
    id: `dp-${String(index + 1).padStart(2, '0')}`,
    slug,
    images: gallery(seed.image, index + 1),
  };
});

export const COLORS: ProductColor[] = Object.values(CO);

export const SIZES = ['P', 'M', 'G', 'GG', 'Único', '38', '39', '40', '41', '42', '43'];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function categoryLabel(id: CategoryId): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function priceRange(): [number, number] {
  const prices = PRODUCTS.map((p) => p.price);
  return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
}
