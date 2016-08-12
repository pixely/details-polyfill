/**
 * Add support for details element for browsers which require it
 *
 * @author Graham Martin <graham@pixely.co.uk>
 * @version 1.0
 */

export default (function Details() {
  // Adapted to ES6 from the following code by @mathiasbynens
  // https://mathiasbynens.be/notes/html5-details-jquery#comment-35
  const isDetailsSupported = (function isDetailsSupported(doc) {
    const el = doc.createElement('details');
    let fake;
    let diff;

    if (!('open' in el)) {
      return false;
    }
    const root = doc.body || (() => {
      const de = doc.documentElement;
      fake = true;
      return de.insertBefore(doc.createElement('body'), de.firstElementChild || de.firstChild);
    });
    el.innerHTML = '<summary>a</summary>b';
    el.style.display = 'block';
    root.appendChild(el);
    diff = el.offsetHeight;
    el.open = true;
    diff = diff !== el.offsetHeight;
    root.removeChild(el);
    if (fake) {
      root.parentNode.removeChild(root);
    }
    return diff;
  }(document));

  const toggleOpen = function toggleOpen() {
    const parent = this.parentNode;

    if (parent.tagName.toLowerCase() === 'details') {
      if (parent.hasAttribute('open')) {
        parent.removeAttribute('open');
      } else {
        parent.setAttribute('open', '');
      }
    }
  };

  if (isDetailsSupported) {
    return;
  }

  // Grab references to the detail DOM elements
  const summaries = document.querySelectorAll('summary');

  // Iterate over all summary elements, set accessibility focused attributes and
  // set event listeners for clicks or keypresses
  if (summaries) {
    for (const summary of summaries) {
      summary.setAttribute('role', 'button');
      summary.setAttribute('tabindex', 0);
      summary.addEventListener('click', toggleOpen);
      summary.addEventListener('keypress', (e) => {
        const key = e.which || e.keyCode;
        if (key === 13 || key === 32) { // enter or space keys
          toggleOpen.apply(e.target);
        }
      });
    }
  }
}());
