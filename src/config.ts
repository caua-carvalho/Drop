/**
 * Dados institucionais da loja.
 * Fonte: perfil @dropmultimarcas (Instagram).
 */
export const STORE = {
  name: 'Drop Multimarcas',
  tagline: 'Roupas e acessórios — nacionais e importados',
  whatsapp: '5512991867788',
  whatsappLabel: '(12) 99186-7788',
  instagram: 'dropmultimarcas',
  instagramUrl: 'https://www.instagram.com/dropmultimarcas/',
  city: 'Caçapava',
  state: 'SP',
  addressLine: 'Loja física em Caçapava — SP',
  ships: 'Enviamos para todo o Brasil',
  freeShippingFrom: 299,
  openingHours: 'Seg a Sáb — 09h às 18h',
} as const;

/** Monta um link do WhatsApp com mensagem pré-preenchida. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`;
}
