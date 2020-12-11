const CACHE_NAME = `v${new Date().toISOString().split('T')[0]}`

const URLS_TO_CACHE = [
  'https://www.instagram.com/explore/locations/260718750/parc-des-buttes-chaumont/'
]

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      ))
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event

  if (!URLS_TO_CACHE.includes(request.url)) {
    return fetch(request)
  }

  const findResponsePromise = caches
    .open(CACHE_NAME)
    .then((cache) => cache.match(request))
    .then((response) => {
      if (response) {
        return response
      }

      return fetch(request)
        .then((res) => {
          return caches
            .open(CACHE_NAME)
            .then((cache) => {
              cache.put(request.url, res.clone())

              return res
            })
        })
    })

  event.respondWith(findResponsePromise)
})
