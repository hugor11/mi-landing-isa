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
    if (currentPage === 'cerveza.html') {
        const promoLink = document.querySelector('nav a[href="cerveza.html"]');
        if (promoLink) {
            promoLink.classList.add('nav-link-active');
        }
    }

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
});
