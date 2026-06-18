document.addEventListener('DOMContentLoaded', () => {
    // ── Scroll Animation Observer ──────────────────────────────────────────
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('float-animate');
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animation trigger class
    document.querySelectorAll('.float-animate-trigger').forEach(el => {
        animationObserver.observe(el);
    });

    // ── About Carousel ───────────────────────────────────────────────────
    const aboutCarousel = document.getElementById('aboutCarousel');
    if (aboutCarousel) {
        let currentSlideAbout = 0;
        const slidesAbout = aboutCarousel.querySelectorAll('.carousel-slide');
        const dotsAbout = aboutCarousel.querySelectorAll('.dot');
        const totalSlidesAbout = slidesAbout.length;

        function showSlideAbout(index) {
            slidesAbout.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            dotsAbout.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function nextSlideAbout() {
            currentSlideAbout = (currentSlideAbout + 1) % totalSlidesAbout;
            showSlideAbout(currentSlideAbout);
        }

        // Auto-advance every 10 seconds
        let carouselIntervalAbout = setInterval(nextSlideAbout, 10000);

        // Dot click handlers
        dotsAbout.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlideAbout = index;
                showSlideAbout(currentSlideAbout);
                clearInterval(carouselIntervalAbout);
                carouselIntervalAbout = setInterval(nextSlideAbout, 10000);
            });
        });

        // Initialize first slide
        showSlideAbout(currentSlideAbout);
    }

    // ── Future Carousel ───────────────────────────────────────────────────
    const futureCarousel = document.getElementById('futureCarousel');
    if (futureCarousel) {
        let currentSlideFuture = 0;
        const slidesFuture = futureCarousel.querySelectorAll('.carousel-slide');
        const dotsFuture = futureCarousel.querySelectorAll('.dot');
        const totalSlidesFuture = slidesFuture.length;

        function showSlideFuture(index) {
            slidesFuture.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            dotsFuture.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function nextSlideFuture() {
            currentSlideFuture = (currentSlideFuture + 1) % totalSlidesFuture;
            showSlideFuture(currentSlideFuture);
        }

        // Auto-advance every 10 seconds
        let carouselIntervalFuture = setInterval(nextSlideFuture, 10000);

        // Dot click handlers
        dotsFuture.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlideFuture = index;
                showSlideFuture(currentSlideFuture);
                clearInterval(carouselIntervalFuture);
                carouselIntervalFuture = setInterval(nextSlideFuture, 10000);
            });
        });

        // Initialize first slide
        showSlideFuture(currentSlideFuture);
    }

});


// ── Back to Top Button ────────────────────────────────────────
const backToTopBtn = document.getElementById('backToTopBtn');

if (backToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ── Ithaca Modal Content Loading ─────────────────────────────────────
if (window.jQuery) {
    $(function () {
        const $modalBody = $('#ithacaModalBody');

        function loadIthacaLinks() {
            if ($modalBody.data('loaded')) {
                return;
            }

            if (window.location.protocol === 'file:') {
                $modalBody.data('loaded', true);
                return;
            }

            $.getJSON('data/ithaca.json')
                .done(function (data) {
                    let html = '<p><strong>' + (data.title || 'Ithaca Links') + '</strong></p>';
                    if (data.bio) {
                        html += '<p>' + data.bio + '</p>';
                    }
                    if (Array.isArray(data.links)) {
                        data.links.forEach(function (link) {
                            html += '<p><a class="ithaca-link" href="' + link.href + '" target="_blank">' + link.label + '</a></p>';
                        });
                    }
                    $modalBody.html(html);
                    $modalBody.data('loaded', true);
                })
                .fail(function () {
                    $modalBody.data('loaded', true);
                });
        }

        $('#ithacaModal').on('shown.bs.modal', loadIthacaLinks);
        $('.future-name').on('click', loadIthacaLinks).css('cursor', 'pointer');
    });
}
