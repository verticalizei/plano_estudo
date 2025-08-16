const CACHE_NAME = 'plano-estudo-cache-v1';
const urlsToCache = [
  './',
  'index.html',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap',
  'icons/icon-192x192.png', // Certifique-se de que estes ícones existam
  'icons/icon-512x512.png'
  // Adicione aqui todos os outros arquivos estáticos que seu app precisa para funcionar offline
  // Ex: 'styles.css', 'script.js', etc. (se você os tivesse em arquivos separados)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
