import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const isLinks = block.classList.contains('links');

  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');

    // Create an anchor element only if isLinks is true
    let wrapper = li;
    if (isLinks) {
      const a = document.createElement('a');
      const link = row.querySelector('a');
      if (link) {
        a.href = link.href;
        a.setAttribute('aria-label', link.href); // Set aria-label
        link.remove(); // Remove original link from row
      }
      wrapper = a; // Set wrapper as <a>
      li.append(a); // Append <a> to <li>
    }

    // Move row contents into wrapper (either <li> or <a> if isLinks is true)
    while (row.firstElementChild) wrapper.append(row.firstElementChild);

    [...wrapper.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });

    ul.append(li);
  });

  // Optimize images within <picture> tags
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    const image = optimizedPic.querySelector('img');
    image.setAttribute('width', '750');
    image.setAttribute('height', '60');
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Clear and append the new structure to the block
  block.textContent = '';
  block.append(ul);
}
