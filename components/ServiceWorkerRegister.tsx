'use client';

import { useEffect } from 'react';

/**
 * Registers the service worker silently on page load.
 * No UI — the install prompt is handled by InstallButton in the header.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {});
    }
  }, []);
  return null;
}
