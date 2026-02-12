/* ============================================
   cetin.info — Scripts
   Minimal JS for animations and interactions
   ============================================ */

(function () {
    'use strict';

    // --- Scroll Reveal ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal--visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // --- Nav scroll shadow ---
    const nav = document.getElementById('nav');

    const navObserver = new IntersectionObserver(
        ([entry]) => {
            nav.classList.toggle('nav--scrolled', !entry.isIntersecting);
        },
        { threshold: 0.9 }
    );

    const hero = document.getElementById('hero');
    if (hero) navObserver.observe(hero);

    // --- Mobile nav toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('nav__links--open');
            navToggle.classList.toggle('nav__toggle--active');
            navToggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu on link click
        navLinks.querySelectorAll('.nav__link').forEach((link) => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav__links--open');
                navToggle.classList.remove('nav__toggle--active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Smooth scroll for anchor links (fallback) ---
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Contact form submission feedback ---
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            const action = form.getAttribute('action');
            if (action.includes('YOUR_FORM_ID')) {
                e.preventDefault();
                alert(
                    'Contact form is not configured yet. Please set up Formspree and update the form action URL.'
                );
            }
        });
    }
})();
