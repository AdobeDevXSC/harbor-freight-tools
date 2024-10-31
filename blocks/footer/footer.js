import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  const ul = footer.querySelector('ul:first-of-type');
  [...ul.children].forEach((li) => {
    const a = li.querySelector('a');
    let imgAttr = '';
    if (a) imgAttr = a.querySelector('img').getAttribute('data-icon-name');
    if (imgAttr) a.title = imgAttr;
  });

  block.append(footer);
}
