import { Check, X } from 'lucide-react';
import { useUIStore } from '../../store/shop';

export function Toaster() {
  const toasts = useUIStore((s) => s.toasts);
  const dismiss = useUIStore((s) => s.dismissToast);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] flex flex-col items-center gap-2 px-4 pb-24 lg:items-end lg:pb-6 lg:pr-6"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl border border-line bg-ink-800/95 p-3 shadow-soft backdrop-blur animate-[fade-up_0.35s_cubic-bezier(0.16,1,0.3,1)_both]"
        >
          {toast.image ? (
            <img src={toast.image} alt="" className="h-14 w-12 shrink-0 rounded-lg object-cover" />
          ) : (
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-500 text-ink-950">
              <Check size={18} />
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1.5 text-sm font-medium text-cream">
              <Check size={14} className="text-gold-400" /> {toast.title}
            </p>
            {toast.description && <p className="truncate text-xs text-muted">{toast.description}</p>}
          </div>
          <button
            type="button"
            onClick={() => dismiss(toast.id)}
            aria-label="Fechar notificação"
            className="grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-full text-muted hover:bg-white/5 hover:text-cream"
          >
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}
