const cacheInstance = require('./lru-cache');

const hash = require('object-hash');

const toSafeObject = obj => JSON.parse(JSON.stringify(obj || {}));

function cache(func, options = {}) {
  return (root, args, context) => {
    try {

      const key = options.key
        ? options.key(root, args, context)
        : `${hash(root.request.body)}:${hash(toSafeObject(args))}`;

      // Why I need root context???
      // :`${hash(func)}:${hash(toSafeObject(root))}:${hash(toSafeObject(args))}`;
      if (!key) {
        throw new Error('Can NOT hash cache KEY.');
      }

      //const execute = func(root, args, context);

      const executeAndCache = async () => {
        const value = await func(root, args, context);
        cacheInstance.set(key, value, options);
        return value;
      };

      return cacheInstance.get(key) || executeAndCache();
    } catch (e) {
      // Failover
      return (
        func(root, args, context)
      );
    }
  };
}

module.exports = cache;
