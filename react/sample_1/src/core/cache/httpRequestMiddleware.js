const cacheInstance = require('./lru-cache');
const hash = require('object-hash');

const matchUrls = [
  /^\/$/,
  /^\/vehicle\//,
];
const graphqlOuery = [
  /GetMostViewedListing/,
  /getListingData/,
  /getCmsBlockBySlug/,
  /getRecommend/,
  /getImageBanner/,
  /getListingSettings/,
];

const isStringMatch = function(string, arr) {
  const len = arr.length;
  let i = 0;

  for (; i < len; i++) {
    if (string.match(arr[i])) {
      return true;
    }
  }
  return false;

};

const processCache = function(key, res, next) {
  res.append('Cache-Key', key);
  const cachedBody = cacheInstance.get(key);
  if (cachedBody) {
    res.append('Cache-Status', 'hit');
    res.send(cachedBody);
    return true;
  } else {
    res.append('Cache-Status', 'no-hit');
    res.sendResponse = res.send;
    res.send = (body) => {
      cacheInstance.set(key, body);
      res.sendResponse(body);
    };
    return false;
  }
};


const processCacheJson = function(key, res, next) {
  res.append('Cache-Key', key);
  const cachedBody = cacheInstance.get(key);
  if (cachedBody) {
    res.append('Cache-Status', 'hit');
    res.json(cachedBody);
    return true;
  } else {
    res.append('Cache-Status', 'no-hit');
    res.sendResponseJson = res.json;
    res.json = (json) => {
      cacheInstance.set(key, json);
      res.sendResponseJson(json);
    };
    return false;
  }
};

const cacheMiddleware = function (req, res, next) {
  if (req.method === 'GET' && isStringMatch(req.url, matchUrls)) { // If match url
    const key = 'REQUEST_GET:' + hash(req.url);
    if (processCache(key, res, next)) {
      return res;
    }
  } else if (req.url === '/graphql') { // If graphql
    const data = req.body.query ? (req.body.query + JSON.stringify(req.body.variables)) : JSON.stringify(req.body);
    if (isStringMatch(data, graphqlOuery)) { // If match regex
      const key = 'REQUEST_GQL:' + hash(data);
      if (processCacheJson(key, res, next)) {
        return res;
      }
    }
  }
  next();
};

export default cacheMiddleware;
