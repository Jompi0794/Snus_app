const CACHE_NAME = 'snus-tracker-v1';
const urlsToCache = [
  '/Snus_app/',
  '/Snus_app/index.html',
  '/Snus_app/Style.css',
  '/Snus_app/Script.js',
  '/Snus_app/manifest.json',
  '/Snus_app/IMG_0760.jpg'
];

// Installera service worker och casha filer
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Hämta från cache, fallback till nätverk
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match('/Snus_app/index.html'))
  );
});

// Rensa gamla cacher vid aktivering
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
