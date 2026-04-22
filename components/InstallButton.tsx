'use client';

import { useEffect, useState } from 'react';

type DeferredPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

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

export function InstallButton() {
  const [deferred, setDeferred] = useState<DeferredPromptEvent | null>(null);
  const [platform, setPlatform] = useState<'android' | 'ios' | null>(null);
  const [showIosHint, setShowIosHint] = useState(false);

  useEffect(() => {
    if (isInStandaloneMode()) return;

    if (isIOS()) {
      setPlatform('ios');
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as DeferredPromptEvent);
      setPlatform('android');
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  function handleClick() {
    if (platform === 'android' && deferred) {
      deferred.prompt();
      deferred.userChoice.then(() => {
        setDeferred(null);
        setPlatform(null);
      });
    } else if (platform === 'ios') {
      setShowIosHint(true);
      setTimeout(() => setShowIosHint(false), 8000);
    }
  }

  if (!platform) return null;

  return (
    <>
      <button
        onClick={handleClick}
        className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-line bg-cream-100 px-3 py-1.5 text-xs font-medium text-ink-soft transition-all hover:border-line-strong hover:bg-cream-200 hover:text-ink"
        title="התקן כאפליקציה"
        aria-label="התקן כאפליקציה"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <span>התקן</span>
      </button>

      {/* iOS hint popover */}
      {showIosHint && (
        <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm rounded-2xl border border-line bg-cream-50 p-4 text-sm shadow-lift animate-fade-up">
          <p className="font-medium text-ink">כדי להתקין באייפון:</p>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted">
            לחץ על כפתור השיתוף{' '}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline align-middle text-amber">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>{' '}
            בתחתית המסך, ואז &ldquo;הוסף למסך הבית&rdquo;.
          </p>
        </div>
      )}
    </>
  );
}
