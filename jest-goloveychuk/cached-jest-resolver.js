const cache = new Map();

module.exports = (request, options)  => {
    const cacheKey = `${request}!!${options.basedir}`;

    let resolved = cache.get(cacheKey);
    if (!resolved) {
        resolved = options.defaultResolver(request, options);
        cache.set(cacheKey, resolved);
    }

    return resolved
}
