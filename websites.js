// Load and display cards for each web section
async function loadWebCards(webNumber) {
    try {
        const response = await fetch(`data/web${webNumber}.json`);
        const projects = await response.json();
        const container = document.getElementById(`web${webNumber}-cards`);

        projects.forEach(project => {
            const card = createCard(project, webNumber);
            container.appendChild(card);
        });
    } catch (error) {
        console.error(`Error loading web${webNumber} data:`, error);
    }
}

function createCard(project, webNumber) {
    const card = document.createElement('div');
    card.className = `card-bubble ${project.favorite ? 'favorite-card' : ''}`;
    const imagesHTML = project.images.length > 1
        ? createCarousel(project.images, webNumber)
        : `<img src="imgs/Web${webNumber}/${project.images[0]}" alt="${project.name}" class="card-image">`;

    card.innerHTML = `
        ${imagesHTML}
<div class="card-content">
  ${project.originalName ? `<h6 class="card-subtitle">${project.originalName}</h6>` : ''}
  <div class="card-title">${project.name}</div>
  <div class="card-bio">${project.bio}</div>
${project.links
            ? `
    <div class="multi-links">
        ${project.links.map(link => `
            <a href="${link.url}" target="_blank" class="card-link">
                ${link.label}
            </a>
        `).join('')}
    </div>
    `
            : `
${project.link && project.link !== '#'
                ? `
    <a href="${project.link}" target="_blank" class="card-link">
        View Website
    </a>
    `
                : `
    <span class="card-link disabled-link">
        No Link
    </span>
`}
`}</div>
      `;

    return card;
}

function createCarousel(images, webNumber) {
    const carouselHTML = `
        <div class="carousel-container">
<div class="web-carousel-slides" data-carousel>            ${images.map(img => `<img src="imgs/Web${webNumber}/${img}" class="web-carousel-slide" alt="Project image">`).join('')}
          </div>
          <div class="carousel-nav" data-nav>
            ${images.map((_, i) => `<div class="carousel-dot ${i === 0 ? 'active' : ''}" data-slide="${i}"></div>`).join('')}
          </div>
        </div>
      `;
    return carouselHTML;
}

// Initialize carousel functionality
function initCarousels() {
    document.querySelectorAll('[data-carousel]').forEach(carousel => {
        const slides = carousel.querySelectorAll('.web-carousel-slide');
        const dots = carousel.parentElement.querySelectorAll('.carousel-dot');
        let currentIndex = 0;

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel(carousel, currentIndex, slides);
                updateDots(dots, currentIndex);
            });
        });

        // Auto-scroll carousel
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel(carousel, currentIndex, slides);
            updateDots(dots, currentIndex);
        }, 5000);
    });
}

function updateCarousel(carousel, index, slides) {
    const scrollAmount = index * carousel.querySelector('.web-carousel-slide').offsetWidth;
    carousel.scrollLeft = scrollAmount;
}

function updateDots(dots, index) {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

// Load all web sections on page load
window.addEventListener('DOMContentLoaded', () => {
    loadWebCards(1);
    loadWebCards(2);
    loadWebCards(3);

    setTimeout(initCarousels, 500);
});