import { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import { STORE, whatsappLink } from '../../config';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';

export function NewsletterCta() {
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('Novidades e lançamentos');

  const message = `Olá, ${STORE.name}! Meu nome é ${name || '(seu nome)'} e quero receber ${interest.toLowerCase()}.`;

  return (
    <section className="container-x cv-auto pb-16 lg:pb-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-gold-500/25 bg-gradient-to-br from-ink-850 via-ink-900 to-ink-850 p-6 sm:p-10 lg:p-14">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-500/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-14">
            <div>
              <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] text-gold-500">
                <span className="h-px w-8 bg-gold-500/70" />
                Fique por dentro
              </p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-cream text-balance sm:text-4xl lg:text-[2.75rem]">
                Receba as novidades antes de todo mundo
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
                Deixe seu nome, escolha o que te interessa e continue a conversa no WhatsApp. Sem spam — só o que vale a
                pena garimpar.
              </p>
            </div>

            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Cadastro para receber novidades"
            >
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-cream/80">Seu nome</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Como podemos te chamar?"
                  className="h-11 rounded-xl border border-line bg-ink-950/60 px-4 text-sm text-cream placeholder:text-muted-2 focus:border-gold-500 focus:outline-none"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-cream/80">Quero receber</span>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="h-11 cursor-pointer rounded-xl border border-line bg-ink-950/60 px-4 text-sm text-cream focus:border-gold-500 focus:outline-none"
                >
                  <option>Novidades e lançamentos</option>
                  <option>Promoções e liquidações</option>
                  <option>Looks masculinos</option>
                  <option>Looks femininos</option>
                  <option>Importados</option>
                </select>
              </label>

              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noreferrer"
                className="mt-1 block"
                aria-label="Continuar no WhatsApp"
              >
                <Button variant="primary" size="lg" className="w-full" type="button">
                  <Send size={16} /> Quero receber no WhatsApp
                </Button>
              </a>

              <p className="flex items-center gap-1.5 text-[11px] text-muted-2">
                <MessageCircle size={13} className="text-gold-500" /> Abre o WhatsApp com a mensagem pronta.
              </p>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
