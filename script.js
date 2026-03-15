function showPage(pageName, pushState = true) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });

    const selectedSection = document.getElementById(pageName);
    if (selectedSection) {
        selectedSection.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.querySelectorAll('.nav-item').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === pageName) {
            link.classList.add('active');
        }
    });

    if (pushState) {
        history.pushState({ page: pageName }, '', '/' + pageName);
    }
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-theme');
    localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-item').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showPage(this.dataset.page);
        });
    });

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }

    window.addEventListener('popstate', function(e) {
        const page = e.state?.page || 'about';
        showPage(page, false);
    });

    // Load page from URL path on initial visit
    const validPages = ['about', 'projects', 'certs', 'resume'];
    const path = window.location.pathname.replace(/^\//, '').trim();
    const initialPage = validPages.includes(path) ? path : 'about';
    showPage(initialPage, true);

    // Lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');

    document.querySelectorAll('.project-image img').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('open');
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('open');
        lightboxImg.src = '';
    }

    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
});
