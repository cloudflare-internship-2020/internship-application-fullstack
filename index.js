addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with data change over variants
 * @param {Request} request
 */
async function handleRequest(request) {
  let resp = '';
  let response = await fetch('https://cfw-takehome.developers.workers.dev/api/variants')
  if (response.ok) {
    let json = await response.json();
    let variants = json.variants;
    // Determine which group this requester is in.
    const cookie = request.headers.get('cookie')
    const NAME = 'experiment-0'
    if (cookie && cookie.includes(`${NAME}=variant1`)) {
      resp = "variant1"
    } else if (cookie && cookie.includes(`${NAME}=variant2`)) {
      resp = "variant2"
    } else {
      resp = Math.random() < 0.5 ? 'variant1' : 'variant2' // 50/50 split
    }
    let url = resp == 'variant1' ? variants[0] : variants[1]
    let secCall = await fetch(url)
    if (secCall.ok) {
      let text = await secCall.text();
      response = new Response(text, {
        headers: { 'content-type': 'text/html' },
      });
      response.headers.append('Set-Cookie', `${NAME}=${resp}; path=/`)
      return new HTMLRewriter()
        .on('*', new AttributeRewriter(resp))
        .transform(response);
    } else {
      return new Response('Could not access site', {
        headers: { 'content-type': 'text/html' },
      });
    }
  } else {
    return new Response(`Could not get URL's`, {
      headers: { 'content-type': 'text/plain' },
    })
  }
}

  //Class to rewrite the html elements
  class AttributeRewriter {

  // constructor to set the field for variant 1/2
  constructor(attributeName) {
    this.attributeName = attributeName
  }

  //catches the element and rewrites its value
  element(element) {
    if (element.tagName == 'h1' && element.getAttribute('id') == 'title') {
      if (this.attributeName == 'variant1') {
        element.setInnerContent("LinkedIn Profile")
      } else {
        element.setInnerContent("Github Profile")
      }
    }

    if (element.tagName == 'p' && element.getAttribute('id') == 'description') {
      if (this.attributeName == 'variant1') {
        element.setInnerContent("Check my LinkedIn profile")
      } else {
        element.setInnerContent("Check my GitHub Profile")
      }
    }

    if (element.tagName == 'a' && element.getAttribute('id') == 'url') {
      if (this.attributeName == 'variant1') {
        element.setInnerContent("linkedIn")
        element.setAttribute('href', "https://linkedin.com/in/sudipto-ghosh-48a71a161/")
      } else {
        element.setInnerContent("github")
        element.setAttribute('href', "https://github.com/pydevsg")
      }
    }

    if (element.tagName == 'title') {
      if (this.attributeName == 'variant1') {
        element.setInnerContent('Master1')
      } else {
        element.setInnerContent('Master2')
      }
    }
  }
}