// service-worker.js

const CACHE_NAME = 'qrscout-cache-v1';
const urlsToCache = [
  '/', // page d'accueil
  '/index.html',
  '/manifest.json',
  '/icons/favicon-16x16.png',
  '/icons/favicon-32x32.png',
  '/apple-icon.png',
  // ajoute ici d'autres ressources (CSS, JS, images, etc.) nécessaires pour le fonctionnement offline
];

// Lors de l'installation du service worker, on met en cache les ressources essentielles
self.addEventListener('install', event => {
  console.log('[Service Worker] Installation');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Mise en cache des ressources');
        return cache.addAll(urlsToCache);
      })
  );
});

// Lors de la récupération d'une ressource, on renvoie celle-ci depuis le cache si disponible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si la ressource est dans le cache, on la renvoie
        if (response) {
          return response;
        }
        // Sinon, on effectue la requête sur le réseau
        return fetch(event.request);
      })
  );
});
