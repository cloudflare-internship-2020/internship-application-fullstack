const {
  LinkHandler,
  TitleHandler,
  HeaderHandler,
  ParagraphHandler
} = require('./handlers');
const URI = 'https://cfw-takehome.developers.workers.dev/api/variants';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Returns a random integer between the min (inclusive) and
 * the max (exclusive)
 * @param {number} min
 * @param {number} max
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Returns a request to one of the two URI variants at random
 * @param {Request} request
 */
async function handleRequest(request) {
  const resp = await fetch(URI);
  const respJson = await resp.json();
  const variants = respJson.variants;
  const n = getRandomInt(0, variants.length);
  const variantResp = await fetch(variants[n]);
  const editedResp = new HTMLRewriter()
    .on('a#url', new LinkHandler())
    .on('title', new TitleHandler(n + 1))
    .on('h1#title', new HeaderHandler(n + 1))
    .on('p#description', new ParagraphHandler(n + 1))
    .transform(variantResp);
  return editedResp;
}
