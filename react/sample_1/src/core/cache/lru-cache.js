var LRU = require("lru-cache");

class LruCache {
  constructor(options) {
    console.log('CACHE Instance constructor()');
    const maxItems = options && options.maxItems;
    this.cache = new LRU(maxItems);
  }

  get(key) {
    const v = this.cache.get(key);
    //console.log('CACHE ' + ( v ? 'HIT' : 'NO HIT' ) + ' for KEY=' + key);
    return v;
  }

  set(key, value, options) {
    //console.log('CACHE SET for KEY=' + key);
    const { maxAge } = options || {};
    this.cache.set(key, value, maxAge);
    return key;
  }

  values() {
    return this.cache.values();
  }

  keys() {
    return this.cache.keys();
  }

  dump() {
    return this.cache.dump();
  }

  length() {
    return this.cache.length;
  }
};

module.exports = new LruCache();
