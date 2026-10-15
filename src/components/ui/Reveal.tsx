import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { cn } from '../../lib/format';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Atraso em ms para efeito de cascata. */
  delay?: number;
  as?: ElementType;
};

/**
 * Revela o conteúdo suavemente ao entrar na viewport.
 * Respeita `prefers-reduced-motion` (tratado no CSS global).
 */
export function Reveal({ children, className, delay = 0, as }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = (as ?? 'div') as ElementType;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!('IntersectionObserver' in window)) {
      node.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      style={delay ? ({ ['--reveal-delay' as string]: `${delay}ms` } as Record<string, string>) : undefined}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
