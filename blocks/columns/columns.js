export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // Set up image columns and wrap non-picture elements
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const contentDiv = document.createElement('div');
      contentDiv.classList.add('column-content');

      // Move all non-picture elements into contentDiv
      [...col.children].forEach((child) => {
        if (child.tagName !== 'PICTURE') {
          contentDiv.appendChild(child);
        }
      });

      if (contentDiv.children.length > 0) {
        col.appendChild(contentDiv);
      }

      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is the only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }

      const p = contentDiv.querySelector('p:first-of-type');
      if (p) col.prepend(p);

      const div = document.createElement('div');
      [...contentDiv.children].forEach((el) => {
        if(!el.classList.contains('button-container')) div.appendChild(el);
      });
      contentDiv.prepend(div);
    });
  });
}