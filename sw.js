/* Apesv CEO Brief: keeps the page on the phone so it opens instantly, even offline.
   The numbers themselves are saved by the page; this file only saves the page and its fonts. */
const CACHE = 'apesv-brief-v3';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png', './icon-512-maskable.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

// Show the saved copy at once, and fetch a fresh copy in the background for next time
function fromCacheThenUpdate(req, key) {
  return caches.open(CACHE).then((cache) => cache.match(key || req, { ignoreSearch: true }).then((hit) => {
    const fresh = fetch(req).then((res) => {
      if (res && (res.ok || res.type === 'opaque')) cache.put(key || req, res.clone());
      return res;
    }).catch(() => hit);
    return hit || fresh;
  }));
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (req.mode === 'navigate' && url.origin === self.location.origin) { e.respondWith(fromCacheThenUpdate(req, './index.html')); return; }
  if (url.origin === self.location.origin) { e.respondWith(fromCacheThenUpdate(req)); return; }
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') { e.respondWith(fromCacheThenUpdate(req)); return; }
  // Everything else (the Google Apps Script numbers) goes straight to the internet
});
