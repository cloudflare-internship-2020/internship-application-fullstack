/* Full-Stack development internship application code:
 Submitted by Shruti Jagadeesh Bhat, Santa Clara University.(shrutijbhat@gmail.com)
*/

const route = [1,2];
const baseURL = 'https://cfw-takehome.developers.workers.dev/variants/';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond with hello worker text
 * @param {Request} request
 */

// event handler
async function handleRequest() {
  // request the main link for JSON data using fetch(), store it in a variable
  let request = new URL("https://cfw-takehome.developers.workers.dev/api/variants");
  let response = await fetch(request);
  let data  = await response.json();

  //convert the JSON data into string
  let jsonString = JSON.stringify(data);

  // Array containing the JSON objects
  let urlArray = JSON.stringify(data.variants);

  //from the array from JSON, append the API route to the base url
  let url1 = baseURL+route[0];
  let url2 = baseURL+route[1];

  //random nummber generator
  let rand = Math.random();
  console.log("Random value: "+rand);

  if(rand>0.5){
    url = url1; // variant1
  }
  else{
    url = url2; // variant2
  }

  const variantResponse = await fetch(url);
  const variantData = await variantResponse.text();
  
  // display the final screen from randonly chosen route
  return new Response((variantData), {
    headers: { 'content-type': 'text/html;charset=UTF-8' },
  })
}
