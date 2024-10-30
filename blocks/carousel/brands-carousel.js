import { createOptimizedPicture } from '../../scripts/aem.js';

export default function BrandsCarousel(carouselId, data, slidesWrapper, slideIndicators) {
  data.forEach((card, idx) => {
    const picture = createOptimizedPicture(card.Logo, card.Brand, false, [{ width: 320 }]);
		picture.lastElementChild.width = '320';
		picture.lastElementChild.height = '180';

		const createdSlide = document.createElement('li');
		createdSlide.dataset.slideIndex = idx;
		createdSlide.setAttribute('id', `carousel-${carouselId}-slide-${idx}`);
		createdSlide.classList.add('carousel-slide');

		createdSlide.innerHTML = `<div class="carousel-slide-image">${picture.outerHTML}</div>`;

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