async function loadFavoriteCards(webNumber) {
    `).join('')}
            </div>
            `
            : `
            <a href="${project.link}" target="_blank" class="card-link">
                View Website
            </a>
          `}
        </div >
    `;

    return card;
}

function createCarousel(images, webNumber) {
    return `
    < div class="carousel-container" >
          <div class="web-carousel-slides" data-carousel>
            ${images.map(img => `<img src="imgs/Web${webNumber}/${img}" class="web-carousel-slide" alt="Project image">`).join('')}
          </div>
          <div class="carousel-nav" data-nav>
            ${images.map((_, i) => `<div class="carousel-dot ${i === 0 ? 'active' : ''}" data-slide="${i}"></div>`).join('')}
          </div>
        </div >
    `;
}

function initCarousels() {
    document.querySelectorAll('[data-carousel]').forEach(carousel => {
        const slides = carousel.querySelectorAll('.web-carousel-slide');
        const dots = carousel.parentElement.querySelectorAll('.carousel-dot');
        let currentIndex = 0;

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel(carousel, currentIndex);
                updateDots(dots, currentIndex);
            });
        });

        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel(carousel, currentIndex);
            updateDots(dots, currentIndex);
        }, 5000);
    });
}

function updateCarousel(carousel, index) {
    const scrollAmount = index * carousel.querySelector('.web-carousel-slide').offsetWidth;
    carousel.scrollLeft = scrollAmount;
}

function updateDots(dots, index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

window.addEventListener('DOMContentLoaded', () => {
    loadFavoriteCards(1);
    loadFavoriteCards(2);
    loadFavoriteCards(3);

    setTimeout(initCarousels, 500);
});