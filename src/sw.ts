/// <reference lib="webworker" />
import { precacheAndRoute } from 'workbox-precaching'

declare const self: ServiceWorkerGlobalScope

precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request) as Promise<Response>)
  )
})
