// Çevrimdışı çalışma: dosyaları önbelleğe alır (yalnızca https veya localhost üzerinde etkin).
const CACHE = 'harf-macerasi-v2';
const FILES = ['./', 'index.html', 'css/style.css', 'js/data.js', 'js/app.js', 'manifest.webmanifest', 'icons/icon-180.png', 'icons/icon-512.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});
// Önce ağdan dene (güncellemeler hemen gelsin), olmazsa önbellekten ver.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then((r) => {
    const copy = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); return r;
  }).catch(() => caches.match(e.request)));
});
