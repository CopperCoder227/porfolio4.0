async function loadFavoriteCards(webNumber) {
    try {
        const response = await fetch(`data/web${webNumber}.json`);
        const projects = await response.json();

        const favorites = projects.filter(project => project.favorite);

        const container = document.getElementById(`web${webNumber}-cards`);

        favorites.forEach(project => {
            const card = createCard(project, webNumber);
            container.appendChild(card);
        });

    } catch (error) {
        console.error(`Error loading favorites for web${webNumber}:`, error);
    }
}

function createCard(project, webNumber) {
    const card = document.createElement('div');

    card.className = 'card-bubble';

    if (project.favorite) {
        card.classList.add('favorite-card');
    }

    const imagesHTML = project.images.length > 1
        ? createCarousel(project.images, webNumber)
        : `<img src="imgs/Web${webNumber}/${project.images[0]}" alt="${project.name}" class="card-image">`;

    let linksHTML = '';

    if (project.links) {
        linksHTML = `
            <div class="multi-links">
                ${project.links.map(link => `
                    <a href="${link.url}" target="_blank" class="card-link">
                        ${link.label}
                    </a>
                `).join('')}
            </div>
        `;
    } else {
        linksHTML = `
            <a href="${project.link}" target="_blank" class="card-link">
                View Website
            </a>
        `;
    }

    card.innerHTML = `
        ${imagesHTML}
        <div class="card-content">

            ${project.originalName
            ? `<h6 class="card-subtitle">${project.originalName}</h6>`
            : ''
        }

            <div class="card-title">${project.name}</div>

            <div class="card-bio">
            ${project.favoriteBio || project.bio}
            </div>

            ${linksHTML}

        </div>
    `;

    return card;
}

function createCarousel(images, webNumber) {
    return `
        <div class="carousel-container">

            <div class="web-carousel-slides" data-carousel>
                ${images.map(img =>
        `<img src="imgs/Web${webNumber}/${img}" class="web-carousel-slide" alt="Project image">`
    ).join('')}
            </div>

            <div class="carousel-nav">
                ${images.map((_, i) =>
        `<div class="carousel-dot ${i === 0 ? 'active' : ''}"></div>`
    ).join('')}
            </div>

        </div>
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
    const slideWidth =
        carousel.querySelector('.web-carousel-slide').offsetWidth;

    carousel.scrollLeft = slideWidth * index;
}

function updateDots(dots, index) {
    dots.forEach(dot => dot.classList.remove('active'));

    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

window.addEventListener('DOMContentLoaded', () => {

    loadFavoriteCards(1);
    loadFavoriteCards(2);
    loadFavoriteCards(3);

    setTimeout(initCarousels, 500);

});