const VERSION = 5;

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('now-and-then').then(cache => {
            return cache.addAll([
                                'index.html',
                                'app.js'
            ]).then(() => self.skipWaiting());
        }).catch(console.error.bind(console))
    );
});


self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        }).catch(console.error.bind(console))
    );
});
