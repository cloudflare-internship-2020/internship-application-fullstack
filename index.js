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
 * @returns {number}
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Returns a UTC date as a string for the expiration time of a cookie
 * @returns {string}
 */
function getExpiryDate() {
  const now = new Date();
  const time = now.getTime();
  var expireTime = time + 1000 * 36000;
  now.setTime(expireTime);
  return now.toUTCString();
}

/**
 * Returns a request to one of the two URI variants at random
 * @param {Request} request
 */
async function handleRequest(request) {
  const cookies = request.headers.get('Cookie') || '';
  const resp = await fetch(URI);
  const respJson = await resp.json();
  const variants = respJson.variants;
  let n = getRandomInt(0, variants.length);
  if (cookies && cookies.includes(`variant=1`)) {
    n = 0;
  } else if (cookies && cookies.includes(`variant=2`)) {
    n = 1;
  }
  const variantResp = await fetch(variants[n]);
  const editedResp = new HTMLRewriter()
    .on('a#url', new LinkHandler())
    .on('title', new TitleHandler(n + 1))
    .on('h1#title', new HeaderHandler(n + 1))
    .on('p#description', new ParagraphHandler(n + 1))
    .transform(variantResp);
  editedResp.headers.append(
    'Set-Cookie',
    `variant=${n + 1};expires=${getExpiryDate()}; path=/`
  );
  return editedResp;
}
