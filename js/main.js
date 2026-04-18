// ——— Navbar scroll shadow ———
window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('shadow-md', window.scrollY > 50);
});

// ——— Smooth scroll + fermeture menu mobile ———
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.getElementById('mobile-menu').classList.add('hidden');
    });
});

// ——— Compteurs animés ———
function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * target) + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));

// ——— Scroll reveal ———
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ——— Carousel témoignages ———
let currentTestimonial = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('#testimonial-dots [data-index]');

window.showTestimonial = function showTestimonial(index) {
    slides.forEach((s, i) => {
        s.classList.toggle('hidden', i !== index);
        if (i === index) {
            s.classList.remove('fade-in');
            void s.offsetWidth; // reflow pour relancer l'animation
            s.classList.add('fade-in');
        }
    });
    dots.forEach((d, i) => {
        d.classList.toggle('bg-zen-gold', i === index);
        d.classList.toggle('scale-125', i === index);
        d.classList.toggle('bg-gray-600', i !== index);
    });
    currentTestimonial = index;
}

window.nextTestimonial = () => window.showTestimonial((currentTestimonial + 1) % slides.length);
window.prevTestimonial = () => window.showTestimonial((currentTestimonial - 1 + slides.length) % slides.length);

// Auto-rotation toutes les 5 secondes
if (slides.length) setInterval(window.nextTestimonial, 5000);

