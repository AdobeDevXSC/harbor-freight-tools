import { createOptimizedPicture } from '../../scripts/aem.js';

export default function ProductCarousel(carouselId, data, slidesWrapper, slideIndicators) {
  data.forEach((card, idx) => {
    const picture = createOptimizedPicture(card.Image, card.Brand, false, [{ width: 220 }]);
		picture.lastElementChild.width = '220';
		picture.lastElementChild.height = '220';

		const createdSlide = document.createElement('li');
		createdSlide.dataset.slideIndex = idx;
		createdSlide.setAttribute('id', `carousel-${carouselId}-slide-${idx}`);
		createdSlide.classList.add('carousel-slide');

    createdSlide.innerHTML = `
      <a href="${card.CTALink}" target="_blank">
        <div class="carousel-slide-image">
          ${picture.outerHTML}
        </div>
        <div class="carousel-slide-content">
          <span>${card.Brand}</span>
          <p>${card.Product}</p>
          <div class="price">$${card.Price}</div>
        </div>
      </a>
    `;

		const labeledBy = createdSlide.querySelector('h1, h2, h3, h4, h5, h6');
		if (labeledBy) {
			createdSlide.setAttribute('aria-labelledby', labeledBy.getAttribute('id'));
		}

		slidesWrapper.append(createdSlide);

		if (slideIndicators) {
			const indicator = document.createElement('li');
			indicator.classList.add('carousel-slide-indicator');
			indicator.dataset.targetSlide = idx;
			indicator.innerHTML = `<button type="button"><span>Show Slide ${idx + 1} of ${data.length}</span></button>`;
			slideIndicators.append(indicator);
		}
  });
}