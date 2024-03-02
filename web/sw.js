const CACHE_STATIC = 'static-cache-v1';

/**
 * Return static resource from cache (if exists) or fetch from network.
 * @param {FetchEvent} event
 */
function onFetch(event) {
    // FUNCS

    /**
     * Function to detect URLs that always bypass caching for @teqfw/web plugin.
     * @param {Request} req
     * @return {boolean}
     */
    function bypassCache(req) {
        const SW = /(.*)(\/sw\/)(.*)/;
        return !Boolean(req.url.match(SW));
    }

    /**
     * @param {Request} req
     * @param {Cache} cache
     * @return {Promise<Response>}
     */
    async function getFromCacheOrFetchAndCache(req, cache) {
        const cachedResponse = await cache.match(req);
        if (cachedResponse) return cachedResponse;
        // wait until the resource is fetched from the backend and stored in the cache.
        const res = await fetch(req);
        await cache.put(req, res.clone());
        return res;
    }

    // MAIN
    const request = event.request;
    const bypass = bypassCache(request);
    if (bypass === false) {
        const useCache = async () => {
            const cache = await self.caches.open(CACHE_STATIC);
            return await getFromCacheOrFetchAndCache(request, cache);
        };
        event.respondWith(useCache());
    }
}

// MAIN
self.addEventListener('activate', () => self.clients.claim());
self.addEventListener('fetch', onFetch);