const CACHE = 'mergebloom-v7';
const CORE = ['./', 'index.html', 'themes.js', 'matter.min.js', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (/\/art\//.test(url.pathname) || /matter\.min\.js$/.test(url.pathname)){
    // art never changes in place: cache first
    e.respondWith(caches.match(e.request).then(m => m || fetch(e.request).then(r => {
      if (r.ok){ const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); }
      return r;
    })));
    return;
  }
  // everything else: network first so updates land, cache when offline
  e.respondWith(fetch(e.request).then(r => {
    if (r.ok){ const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); }
    return r;
  }).catch(() => caches.match(e.request).then(m => m || caches.match('index.html'))));
});
