// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Testimonial Slider
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const slideIndex = parseInt(e.target.getAttribute('data-slide'));
        showSlide(slideIndex);
    });
});

// Auto slide change
let slideInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000);

// Pause slider on hover
const testimonialSlider = document.querySelector('.testimonial-slider');
if (testimonialSlider) {
    testimonialSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    testimonialSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    });
}

// Cart persistence and Add to Cart animation
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCount = document.querySelector('.cart-count');

// Load cart count from localStorage
let storedCount = parseInt(localStorage.getItem('cartCount'));
if (!isNaN(storedCount)) cartCount.textContent = storedCount;

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Animation effect
        const originalText = button.innerHTML;
        button.innerHTML = '✓ Added';
        button.style.backgroundColor = 'var(--success)';

        // Update cart count (and persist)
        let count = parseInt(cartCount.textContent) || 0;
        count += 1;
        cartCount.textContent = count;
        localStorage.setItem('cartCount', count);

        // Reset button after animation
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.backgroundColor = 'var(--primary)';
        }, 1200);
    });
});

// Product hover effect for mobile
if (window.innerWidth <= 768) {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('hovered');
        });
    });
}

// Newsletter form feedback
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('.newsletter-input');
        const email = input.value.trim();
        if (!email) return;

        // simple UI feedback
        const btn = newsletterForm.querySelector('.newsletter-btn');
        const original = btn.innerHTML;
        btn.innerHTML = 'Subscribed ✓';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = original;
            btn.disabled = false;
            input.value = '';
        }, 1800);
    });
}

// Small enhancement: filter products by category buttons (dynamically created)
(function addCategoryFilters() {
    const categories = new Set();
    document.querySelectorAll('.product-card').forEach(card => {
        const cat = card.querySelector('.product-category')?.textContent || 'Other';
        categories.add(cat);
    });

    if (categories.size === 0) return;

    const section = document.querySelector('.section');
    const filters = document.createElement('div');
    filters.style.textAlign = 'center';
    filters.style.marginBottom = '1.5rem';

    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'btn';
        btn.style.margin = '0 0.4rem 0.6rem 0.4rem';
        btn.textContent = cat;
        btn.addEventListener('click', () => {
            document.querySelectorAll('.product-card').forEach(card => {
                const c = card.querySelector('.product-category')?.textContent || '';
                card.style.display = (c === cat) ? '' : 'none';
            });
        });
        filters.appendChild(btn);
    });

    const showAll = document.createElement('button');
    showAll.className = 'btn btn-outline';
    showAll.textContent = 'Show All';
    showAll.addEventListener('click', () => {
        document.querySelectorAll('.product-card').forEach(card => card.style.display = '');
    });
    filters.appendChild(showAll);

    section.insertBefore(filters, section.querySelector('.section-title').nextSibling);
})();
