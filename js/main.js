

const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.data-sector');

navItems.forEach(anchor => {
    anchor.setAttribute('data-text', anchor.textContent);

    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href') || '';
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
            }
        }
    });
});

function setActiveLinkById(id) {
    if (!id) return;
    navItems.forEach(item => {
        item.classList.remove('active-link');
        if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active-link');
        }
    });
}

if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveLinkById(entry.target.id);
            }
        });
    }, { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 });

    sections.forEach(section => {
        if (section.id) observer.observe(section);
    });
} else {
    function updateActiveNavLinkFallback() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                currentSectionId = section.getAttribute('id');
            }
        });
        setActiveLinkById(currentSectionId);
    }
    window.addEventListener('scroll', updateActiveNavLinkFallback, { passive: true });
    updateActiveNavLinkFallback();
}

const year = new Date().getFullYear();
const footerTextElement = document.getElementById('footer-text');
if (footerTextElement) {
    footerTextElement.innerHTML = `&copy; ${year} Cryptonite - MIT Manipal. All rights reserved.`;
}
