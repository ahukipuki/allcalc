'use client';

import { useEffect, useState } from 'react';

type DeferredPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

const DISMISS_KEY = 'allcalc_pwa_dismiss_until';
const VISITS_KEY = 'allcalc_visits';
const MIN_VISITS_FOR_PROMPT = 2;

function isIOS() {
  if (typeof navigator === 'undefined') return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
}

function isInStandaloneMode() {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia?.('(display-mode: standalone)').matches ||
    (navigator as any).standalone === true
  );
}

export function PWAInstaller() {
  const [deferred, setDeferred] = useState<DeferredPromptEvent | null>(null);
  const [kind, setKind] = useState<'android' | 'ios' | null>(null);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {});
    }

    // If already installed, never prompt
    if (isInStandaloneMode()) return;

    // Respect dismissal
    const dismissUntil = Number(localStorage.getItem(DISMISS_KEY) || 0);
    if (Date.now() < dismissUntil) return;

    const visits = Number(localStorage.getItem(VISITS_KEY) || 0) + 1;
    localStorage.setItem(VISITS_KEY, String(visits));

    if (visits < MIN_VISITS_FOR_PROMPT) return;

    // iOS path — show manual instructions after a small delay
    if (isIOS()) {
      setTimeout(() => setKind('ios'), 3500);
      return;
    }

    // Android/Chrome path — wait for browser's beforeinstallprompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as DeferredPromptEvent);
      setTimeout(() => setKind('android'), 2500);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  function install() {
    if (!deferred) return;
    deferred.prompt();
    deferred.userChoice.then(() => {
      setKind(null);
      setDeferred(null);
    });
  }

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, String(Date.now() + 14 * 86400_000)); // 14 days
    setKind(null);
  }

  if (!kind) return null;

  return (
    <div
      role="dialog"
      aria-label="התקנת האפליקציה"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md animate-fade-up rounded-2xl border border-line bg-cream-50 p-4 shadow-lift md:bottom-6"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ink">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FDFCF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="3" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
        </div>

        <div className="flex-1 text-sm">
          <p className="font-semibold text-ink">התקן את האפליקציה</p>
          {kind === 'android' ? (
            <>
              <p className="mt-0.5 text-xs text-ink-muted">
                גישה מהירה מהמסך הראשי, גם ללא אינטרנט.
              </p>
              <div className="mt-3 flex gap-2">
                <button onClick={install} className="btn-primary !py-1.5 !px-4 !text-xs">
                  התקנה
                </button>
                <button onClick={dismiss} className="btn-ghost !py-1.5 !px-4 !text-xs">
                  לא עכשיו
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                לחץ על{' '}
                <span className="inline-flex items-baseline gap-1 align-middle">
                  {/* iOS share icon */}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline text-amber">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                </span>{' '}
                בתחתית המסך, גלול ובחר &ldquo;הוסף למסך הבית&rdquo;.
              </p>
              <div className="mt-3">
                <button onClick={dismiss} className="btn-ghost !py-1.5 !px-4 !text-xs">
                  הבנתי
                </button>
              </div>
            </>
          )}
        </div>

        <button
          onClick={dismiss}
          className="shrink-0 text-ink-muted hover:text-ink"
          aria-label="סגור"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
