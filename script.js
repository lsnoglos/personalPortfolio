document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || 'en';
    setLanguage(savedLang);

    const hamburger = document.getElementById('hamburger-menu');
    const nav = document.querySelector('nav');
    const closeMenu = document.getElementById('close-menu');

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.add('active');
    });

    closeMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        nav.classList.remove('active');
    });

    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && !nav.contains(e.target) && e.target !== hamburger) {
            nav.classList.remove('active');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 830) {
            nav.classList.remove('active');
        }
    });
});

function setLanguage(lang) {

    const elements = document.querySelectorAll(`[data-${lang}]`);

    elements.forEach(e => {
        const text = e.getAttribute(`data-${lang}`);
        if (text) e.innerText = text;
    });

    localStorage.setItem('lang', lang);

    const buttons = document.querySelectorAll('.language-switcher button');
    buttons.forEach(btn => btn.classList.remove('active-lang'));

    const activeBtn = document.querySelector(`.language-switcher button[data-lang="${lang}"]`);
    if (activeBtn) activeBtn.classList.add('active-lang');
}