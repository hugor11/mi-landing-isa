document.addEventListener('DOMContentLoaded', () => {

    // --- Common Scripts for All Pages ---

    // Set current year in the footer
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // --- Page-Specific Scripts ---

    // Mobile menu toggle logic
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Promotion page: set current date for offers
    const currentDateEl = document.getElementById('currentDate');
    if (currentDateEl) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDateEl.textContent = new Date().toLocaleDateString('es-MX', options);
    }

    // --- UI Enhancements ---

    // Add active class to current page's nav link
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split("/").pop();
        // Check for a direct match or if the link is for index.html and we are at the root.
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            // Avoid adding active class to the WhatsApp button or other non-page links
            if(link.href.includes('.html')) {
                link.classList.add('nav-link-active');
            }
        }
    });

    // Fade-in sections on scroll
    const sections = document.querySelectorAll('.fade-in-section');
    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Stop observing after animation
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the section is visible
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // --- Reviews Carousel (Opiniones) ---
    const track = document.getElementById('reviewsTrack');
    const dotsContainer = document.getElementById('reviewDots');
    const prevBtn = document.getElementById('prevReview');
    const nextBtn = document.getElementById('nextReview');
    if (track && dotsContainer && prevBtn && nextBtn) {
        const slides = Array.from(track.children);
        let index = 0;
        let autoplayId = null;

        // Build dots
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'w-2.5 h-2.5 rounded-full bg-gray-300 aria-[current=true]:bg-red-600';
            dot.setAttribute('aria-label', `Ir a reseña ${i + 1}`);
            if (i === 0) dot.setAttribute('aria-current', 'true');
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        });

        function update() {
            track.style.transform = `translateX(-${index * 100}%)`;
            // Update dots
            Array.from(dotsContainer.children).forEach((d, i) => {
                if (i === index) d.setAttribute('aria-current', 'true');
                else d.removeAttribute('aria-current');
            });
        }

        function goTo(i) {
            index = (i + slides.length) % slides.length;
            update();
        }

        function next() { goTo(index + 1); }
        function prev() { goTo(index - 1); }

        nextBtn.addEventListener('click', next);
        prevBtn.addEventListener('click', prev);

        // Autoplay
        function startAutoplay() {
            stopAutoplay();
            autoplayId = setInterval(next, 5000);
        }
        function stopAutoplay() {
            if (autoplayId) clearInterval(autoplayId);
            autoplayId = null;
        }
        startAutoplay();

        // Pause on hover/focus for accessibility
        const carousel = document.getElementById('reviewsCarousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', stopAutoplay);
            carousel.addEventListener('mouseleave', startAutoplay);
            carousel.addEventListener('focusin', stopAutoplay);
            carousel.addEventListener('focusout', startAutoplay);
        }

        // Touch swipe support
        let startX = 0;
        let isSwiping = false;
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isSwiping = true;
            stopAutoplay();
        }, { passive: true });
        track.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            const dx = e.touches[0].clientX - startX;
            // optional: could add drag feedback by setting transform here
        }, { passive: true });
        track.addEventListener('touchend', (e) => {
            if (!isSwiping) return;
            const dx = e.changedTouches[0].clientX - startX;
            if (dx > 50) prev();
            else if (dx < -50) next();
            isSwiping = false;
            startAutoplay();
        });
    }
});
