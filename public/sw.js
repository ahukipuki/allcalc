// Service Worker for allcalc.co.il
// Strategy: cache-first for static assets, network-first for HTML pages (with cache fallback for offline)

const CACHE_VERSION = 'v1';
const STATIC_CACHE = `allcalc-static-${CACHE_VERSION}`;
const PAGES_CACHE = `allcalc-pages-${CACHE_VERSION}`;

// Precache the homepage + essential assets
const PRECACHE = [
  '/',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Clean up old caches
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((n) => !n.endsWith(CACHE_VERSION))
          .map((n) => caches.delete(n))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  // Don't cache cross-origin (analytics, fonts, ads etc.)
  if (url.origin !== self.location.origin) return;

  // Static assets under /_next/static or /icons/ — cache first, long-lived
  if (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/icons/')) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((res) => {
            const clone = res.clone();
            caches.open(STATIC_CACHE).then((c) => c.put(request, clone));
            return res;
          })
      )
    );
    return;
  }

  // HTML pages — network first, cache fallback
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const clone = res.clone();
          caches.open(PAGES_CACHE).then((c) => c.put(request, clone));
          return res;
        })
        .catch(() => caches.match(request).then((r) => r || caches.match('/')))
    );
  }
});
