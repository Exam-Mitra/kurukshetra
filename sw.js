/* Kurukshetra Service Worker
   Cache-first for app shell, network-first for data.
   v1.0
*/

const CACHE_VERSION = 'kurukshetra-v3-';
const CACHE_STATIC = CACHE_VERSION + 'static';
const CACHE_DYNAMIC = CACHE_VERSION + 'dynamic';

const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/study.css',
  './js/app.js',
  './js/utils/helpers.js',
  './js/storage/save.js',
  './js/data/syllabus.js',
  './js/data/study-content.js',
  './js/data/best-videos.js',
  './js/data/best-resources.js',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png'
];

// Install: cache app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k.startsWith('kurukshetra-') && k !== CACHE_STATIC && k !== CACHE_DYNAMIC)
          .map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

// Fetch: cache-first for app shell, network-first for everything else
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET, chrome-extension, etc.
  if (event.request.method !== 'GET') return;
  if (!url.protocol.startsWith('http')) return;

  // App shell: cache-first
  if (STATIC_ASSETS.some(a => event.request.url.endsWith(a.replace('./', '/')))) {
    event.respondWith(
      caches.match(event.request).then(c => c || fetch(event.request))
    );
    return;
  }

  // External resources (YouTube thumbnails, PDFs): network-first, fallback to cache
  event.respondWith(
    fetch(event.request)
      .then(res => {
        // Cache successful responses
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_DYNAMIC).then(c => c.put(event.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(event.request).then(c => c || new Response('Offline', { status: 503 })))
  );
});
