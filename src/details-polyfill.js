/**
 * Add support for details element for browsers which require it
 *
 * @author Graham Martin <graham@pixely.co.uk>
 */

export default (function Details() {
  // Check for details element support
  const isDetailsSupported = ('open' in document.createElement('details'));

  // CSS used a lightly modified version of work by @jordanaustin
  // https://github.com/jordanaustin/Details-Expander/blob/master/src/css/main.css
  const css = `  
    /*
      NOTE:
      These are defaults meant to mimic the default unstyled brower look.
      I highly recommend you style your details tags but don't do it here.
      Just overwrite the style. Almost everything can be fully customized.
      Anything that shouldn't be overwritten has an !important on it.
    */
    
    .no-details details {
      display: block;
      width: 100%;
    }
    
    .no-details details > summary {
      display: inline-block !important;
      width: 100%  !important;
      min-height: 1.4em;
      padding: 0.125em;
      cursor: pointer;
    }
    
    .no-details details summary:before {
      content:'►';
      font-size: 0.8em;
      position: relative;
      display: inline-block;
      width: 1em;
      height: 1em;
      margin-right: 0.3em;
      transform-origin: 0.4em 0.6em;
    }
    
    .no-details details[open] > summary:before {
      content: '▼';
    }
    
    .no-details details > *:not(summary) {
      display: none;
    }
    
    .no-details details[open] > *:not(summary) {
      /* If you need to display table or something like that feel free */
      display: block;
    }`;

  // injectStyles is based on work by @leifoolsen
  // https://github.com/leifoolsen/lavu-details-polyfill/blob/master/src/index.js
  const injectStyles = () => {
    const style = document.createElement('style');
    style.id = 'details-polyfill-css';
    style.textContent = css
        .replace(/(\/\*([^*]|(\*+[^*\/]))*\*+\/)/gm, '')
        .replace(/\s/gm, ' ');
    style.appendChild(document.createTextNode(''));

    // Must be the first stylesheet so it does not override user css
    document.head.insertBefore(style, document.head.firstChild);
    return true;
  };

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

  // Add class to <html> element to hook our styles too
  document.documentElement.classList.add('no-details');

  // Inject basic details styling
  injectStyles();

  // Grab references to the detail DOM elements
  const details = document.querySelectorAll('details');
  const summaries = document.querySelectorAll('summary');
  let detail;
  let summary;

  if (details) {
    for (detail of details) {
      if (!detail.childNodes.find('summary')) {
        summary = document.createElement('summary');
        summary.textContent = 'Details';
        detail.insertBefore(summary, detail.firstChild);
      }
    }
  }

  // Iterate over all summary elements, set accessibility focused attributes and
  // set event listeners for clicks or keypresses
  if (summaries) {
    for (summary of summaries) {
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
