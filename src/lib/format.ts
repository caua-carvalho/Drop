const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

/** Formata um número em Real brasileiro (ex.: R$ 89,90). */
export function formatBRL(value: number): string {
  return brl.format(value);
}

/** Percentual de desconto arredondado (ex.: 25). */
export function discountPercent(price: number, compareAt?: number): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}

/** Parcelamento simples em 3x sem juros, com valor por parcela. */
export function installment(price: number, times = 3) {
  return { times, value: price / times };
}

/** Junta classes condicionalmente. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** Rótulo de avaliação em texto para leitores de tela. */
export function ratingLabel(rating: number, reviews: number): string {
  return `Avaliação ${rating.toFixed(1)} de 5 com ${reviews} avaliações`;
}
