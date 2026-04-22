'use client';

import { useEffect, useState } from 'react';

type DeferredPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

const DISMISS_KEY = 'allcalc_pwa_dismiss_until';

export function PWAInstaller() {
  const [deferred, setDeferred] = useState<DeferredPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .catch(() => {});
    }

    // Only show install prompt on return visits (after user has engaged)
    const dismissUntil = Number(localStorage.getItem(DISMISS_KEY) || 0);
    if (Date.now() < dismissUntil) return;

    const visits = Number(localStorage.getItem('allcalc_visits') || 0) + 1;
    localStorage.setItem('allcalc_visits', String(visits));

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as DeferredPromptEvent);
      // Show banner only from the 3rd visit onwards — don't nag first-timers
      if (visits >= 3) {
        setTimeout(() => setShowPrompt(true), 2500);
      }
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  function install() {
    if (!deferred) return;
    deferred.prompt();
    deferred.userChoice.then(() => {
      setShowPrompt(false);
      setDeferred(null);
    });
  }

  function dismiss() {
    // Don't show again for 30 days
    localStorage.setItem(DISMISS_KEY, String(Date.now() + 30 * 86400_000));
    setShowPrompt(false);
  }

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md animate-fade-up rounded-2xl border border-line bg-cream-50 p-4 shadow-lift md:bottom-6">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-ink">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FDFCF7" strokeWidth="2">
            <rect x="5" y="2" width="14" height="20" rx="2" strokeLinejoin="round" />
            <line x1="12" y1="18" x2="12.01" y2="18" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-ink">התקן את האפליקציה</p>
          <p className="mt-0.5 text-xs text-ink-muted">
            גישה מהירה לכל המחשבונים ישירות ממסך הבית.
          </p>
          <div className="mt-3 flex gap-2">
            <button onClick={install} className="btn-primary !py-1.5 !px-4 !text-xs">
              התקנה
            </button>
            <button onClick={dismiss} className="btn-ghost !py-1.5 !px-4 !text-xs">
              לא תודה
            </button>
          </div>
        </div>
        <button
          onClick={dismiss}
          className="text-ink-muted hover:text-ink"
          aria-label="סגור"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
