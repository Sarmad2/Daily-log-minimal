/* Daily Log — service worker.
   Makes the app open instantly and work with no internet.
   Bump VERSION with every release: phones then see "A new version is ready — Update". */
const VERSION = "daily-log-v2";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./fonts/Outfit.ttf",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(SHELL)));
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith("daily-log-") && k !== VERSION).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

// the page asks for this when the person taps "Update"
self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  if (new URL(req.url).origin !== self.location.origin) return;   // the app needs nothing external

  // opening the app (any ?tab= shortcut included) always gets the cached page
  if (req.mode === "navigate") {
    event.respondWith((async () => {
      const cached = await caches.match("./index.html", { cacheName: VERSION });
      if (cached) return cached;
      try { return await fetch(req); }
      catch (e) { return new Response("Daily Log is offline and not cached yet. Connect once to install it.", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } }); }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(req, { ignoreSearch: true });
    if (cached) return cached;
    try { return await fetch(req); }
    catch (e) { return new Response("", { status: 504 }); }
  })());
});
