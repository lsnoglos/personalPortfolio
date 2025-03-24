document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('lang') || 'en';
    setLanguage(savedLang);
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