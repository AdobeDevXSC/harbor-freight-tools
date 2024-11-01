import { createOptimizedPicture } from '../../scripts/aem.js';

async function fetchJson(link) {
  const response = await fetch(link?.href);
  if (response.ok) {
	const jsonData = await response.json();
	const data = jsonData?.data;
	return data;
  }
	return 'an error occurred';
}

async function createDepartmentCards(block) {
  const link = block.querySelector('a');
  const data = await fetchJson(link);

  block.innerHTML = '';

  const ul = document.createElement('ul');

  data.forEach((item) => {
    console.log("item: ", item);
    const picture = createOptimizedPicture(item.Image, `Card - ${item.Department}`, false, [{ width: 200 }]);
    picture.lastElementChild.width = '200';
    picture.lastElementChild.height = '200';
    const createdCard = document.createElement('li');
    createdCard.innerHTML = `
      <a href="${item.CTALink}" aria-label="${item.Department}">
        <div class="cards-card-image" data-align="center">${picture.outerHTML}</div>
        <div class="cards-card-body">
          <div>${item.Department}</div>
        </div>
      </a>
    `;
    ul.append(createdCard);
  });

  block.append(ul);
}

export default function decorate(block) {
  const isLinks = block.classList.contains('links');
  const isDepartments = block.classList.contains('departments');

  if (isDepartments)  {
    createDepartmentCards(block);
    return;
  } 

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
        a.setAttribute('aria-label', link.href);
        link.remove(); // Remove original link from row
      }
      wrapper = a;
      li.append(a);
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
