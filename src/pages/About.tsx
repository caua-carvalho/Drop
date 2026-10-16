import { Link } from 'react-router-dom';
import { MapPin, MessageCircle, Store, Truck } from 'lucide-react';
import { InstagramIcon } from '../components/ui/icons';
import { STORE, whatsappLink } from '../config';
import { buttonClasses } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { EditorialBand } from '../components/home/EditorialBand';
import { Benefits } from '../components/home/Benefits';
import { NewsletterCta } from '../components/home/NewsletterCta';

const VALUES = [
  {
    icon: Store,
    title: 'Loja física de verdade',
    text: `Estamos em ${STORE.city}/${STORE.state}. Venha provar, trocar ideia e ver as peças de perto.`,
  },
  {
    icon: Truck,
    title: 'Envio para todo o Brasil',
    text: `Empacotamos com cuidado e enviamos para qualquer estado. Frete combinado no WhatsApp.`,
  },
  {
    icon: MessageCircle,
    title: 'Atendimento humano',
    text: 'Sem robô: quem responde é o time da loja, pronto para te ajudar a escolher.',
  },
];

export function About() {
  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-line">
        <div className="absolute inset-0 -z-10">
          <img src="/brand/hero-store.webp" alt="" className="h-full w-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/80 to-ink-950/60" />
        </div>
        <div className="container-x py-20 lg:py-28">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-400">Sobre a loja</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-cream text-balance sm:text-5xl lg:text-6xl">
            Uma multimarcas feita por gente que ama moda
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-cream/75 sm:text-base">
            O {STORE.name} começou com uma ideia simples: juntar, em {STORE.city}/{STORE.state}, o que a gente usaria de
            verdade. Hoje somos referência em roupas e acessórios nacionais e importados — sempre com curadoria e
            atendimento próximo.
          </p>
        </div>
      </section>

      <section className="container-x py-16 lg:py-24">
        <div className="grid gap-4 sm:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-line bg-ink-900/60 p-6">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400">
                  <v.icon size={21} />
                </span>
                <h2 className="mt-5 font-display text-2xl text-cream">{v.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <img
              src="/brand/hero-rack.webp"
              alt="Interior da loja Drop Multimarcas"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-2xl border border-line object-cover"
            />
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-3xl text-cream sm:text-4xl">Nossos valores</h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted">
              <p>
                <strong className="font-semibold text-cream">Curadoria de verdade.</strong> Nada entra na loja sem
                passar pela mão do time. Preferimos pouco e bom a muito e qualquer coisa.
              </p>
              <p>
                <strong className="font-semibold text-cream">Preço justo.</strong> Trabalhamos com nacionais e
                importados para atender estilos e bolsos diferentes, sem abrir mão da qualidade.
              </p>
              <p>
                <strong className="font-semibold text-cream">Proximidade.</strong> Antes de vender, a gente escuta. O
                WhatsApp da loja é o canal direto com quem entende do assunto.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/loja" className={buttonClasses('primary', 'md')}>Ver a coleção</Link>
              <a href={STORE.instagramUrl} target="_blank" rel="noreferrer" className={buttonClasses('outline', 'md')}>
                <InstagramIcon size={16} /> @{STORE.instagram}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="pagamento" className="border-y border-line bg-ink-900">
        <div className="container-x py-16 lg:py-20">
          <SectionHeading
            align="center"
            eyebrow="Como comprar"
            title="Simples do começo ao fim"
            description="Escolha as peças no site, monte o carrinho e finalize pelo WhatsApp. A gente confirma estoque, frete e forma de pagamento com você."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ['01', 'Escolha as peças', 'Navegue pela loja, selecione cor e tamanho e adicione ao carrinho.'],
              ['02', 'Finalize o pedido', 'Revise o carrinho e envie o pedido em um clique pelo WhatsApp.'],
              ['03', 'Receba em casa', 'Combinamos o frete e você recebe no endereço que preferir.'],
            ].map(([num, title, text], i) => (
              <Reveal key={num} delay={i * 80}>
                <div className="h-full rounded-2xl border border-line p-6">
                  <span className="font-display text-4xl text-gold-500">{num}</span>
                  <h3 className="mt-3 font-sans text-base font-semibold text-cream">{title}</h3>
                  <p className="mt-2 text-sm text-muted">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="trocas" className="container-x py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-3xl text-cream sm:text-4xl">Trocas, devoluções e pagamento</h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted">
              <p>
                Você tem até <strong className="font-semibold text-cream">7 dias corridos</strong> após o recebimento
                para solicitar troca ou devolução, conforme o Código de Defesa do Consumidor. A primeira troca de
                tamanho é por nossa conta.
              </p>
              <p>
                Aceitamos <strong className="font-semibold text-cream">Pix</strong> (com 5% de desconto),{' '}
                <strong className="font-semibold text-cream">cartão de crédito em até 3x sem juros</strong> e dinheiro na
                loja física.
              </p>
            </div>
            <a
              href={whatsappLink('Olá! Tenho uma dúvida sobre trocas e pagamento.')}
              target="_blank"
              rel="noreferrer"
              className={buttonClasses('primary', 'md', 'mt-7')}
            >
              <MessageCircle size={16} /> Tirar dúvidas no WhatsApp
            </a>
          </div>

          <div className="rounded-2xl border border-line bg-ink-900/60 p-6 sm:p-8">
            <h3 className="font-display text-2xl text-cream">Onde nos encontrar</h3>
            <ul className="mt-5 space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-gold-500" />
                <span className="text-muted">
                  {STORE.addressLine}
                  <span className="block text-cream/80">{STORE.openingHours}</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle size={18} className="mt-0.5 shrink-0 text-gold-500" />
                <a
                  href={whatsappLink('Olá! Vim pelo site.')}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted transition-colors hover:text-gold-300"
                >
                  WhatsApp {STORE.whatsappLabel}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <InstagramIcon size={18} className="mt-0.5 shrink-0 text-gold-500" />
                <a
                  href={STORE.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted transition-colors hover:text-gold-300"
                >
                  @{STORE.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <EditorialBand />
      <Benefits />
      <NewsletterCta />
    </div>
  );
}
