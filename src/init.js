if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(() => console.log('Service Worker Registered'));

    navigator.serviceWorker.ready
    .then(() => console.log('Service Worker Ready'));
}
