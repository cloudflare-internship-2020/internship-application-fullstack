const URI = "https://cfw-takehome.developers.workers.dev/api/variants";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Returns a random integer between the min (inclusive) and
 * the max (exclusive)
 * @param {Number} min
 * @param {Number} max
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
  const variantResp = await fetch(variants[getRandomInt(0, variants.length)]);
  return variantResp;
}
