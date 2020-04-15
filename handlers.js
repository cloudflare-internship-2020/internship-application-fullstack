/**
 * Class to handle editing <a> elements with the 'url' id
 */
class LinkHandler {
  /**
   * Edit the inner content of the link and the href
   * @param {Element} element
   */
  element(element) {
    element.setInnerContent('Visit my website!');
    element.setAttribute('href', 'https://jamielau.me');
  }
}

/**
 * Class to handle editing <title> elements
 */
class TitleHandler {
  /**
   * Create a handler for titles
   * @param {number} varNum - The variant number
   */
  constructor(varNum) {
    this.varNum = varNum;
  }

  /**
   * Edits the inner content of the provided title element
   * @param {Element} element
   */
  element(element) {
    const content =
      this.varNum === 1 ? 'Jamie Lau' : 'Jamie Lau | Software Developer';
    element.setInnerContent(content);
  }
}

/**
 * Class to handle editing <h1> elements with id 'title'
 */
class HeaderHandler {
  /**
   * Creates a header handler
   * @param {number} varNum - The variant number
   */
  constructor(varNum) {
    this.varNum = varNum;
  }

  /**
   * Modifies content within the provided header element
   * @param {Element} element
   */
  element(element) {
    const content = this.varNum === 1 ? 'Jamie Lau' : "Hi, I'm Jamie";
    element.setInnerContent(content);
  }
}

/**
 * Class to handle editing <p> elements with id 'description'
 */
class ParagraphHandler {
  /**
   * Creates a paragraph handler
   * @param {number} varNum - The variant number
   */
  constructor(varNum) {
    this.varNum = varNum;
  }

  /**
   * Edits the inner content of the paragraph
   * @param {Element} element
   */
  element(element) {
    const content =
      this.varNum === 1
        ? "I'm a Statistics and Computational Mathematics Student at the University of Waterloo"
        : "I'm a 3rd-year Math student at UW with a passion for software development.";
    element.setInnerContent(content);
  }
}

module.exports = { LinkHandler, TitleHandler, HeaderHandler, ParagraphHandler };
