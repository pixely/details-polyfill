/**
 * Add support for details element for browsers which require it
 *
 * @author Graham Martin <graham@pixely.co.uk>
 */

export default (function Details() {
  // Check for details element support
  const isDetailsSupported = ('open' in document.createElement('details'));

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
