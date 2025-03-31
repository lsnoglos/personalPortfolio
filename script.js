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

    initCarousel('projects-carousel');

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


function initCarousel(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const prevButton = carousel.querySelector('.carousel-btn.left');
    const nextButton = carousel.querySelector('.carousel-btn.right');
    const indicatorsContainer = carousel.querySelector('.carousel-indicators');
    let currentIndex = 0;
    let currentTranslate = 0;
    let startX = 0;
    let isDragging = false;

    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        items.forEach((item, index) => {
            const imgElement = item.querySelector('img');
            const src = imgElement ? imgElement.getAttribute('src') : '';
            const indicator = document.createElement('img');
            indicator.classList.add('indicator');
            indicator.src = src;
            if (index === currentIndex) {
                indicator.classList.add('active');
            }
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
            indicatorsContainer.appendChild(indicator);
        });
    }

    function updateIndicators() {
        const indicators = indicatorsContainer.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function updateCarousel() {
        const activeItem = items[currentIndex];
        const container = carousel.querySelector('.carousel-track-container');
        const containerWidth = container.offsetWidth;
        const itemWidth = activeItem.offsetWidth;
        const itemLeft = activeItem.offsetLeft;
        const offset = containerWidth / 2 - (itemLeft + itemWidth / 2);
        track.style.transform = `translateX(${offset}px)`;
        currentTranslate = offset;
        setActiveItem(currentIndex);
    }

    function setActiveItem(index) {
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        updateIndicators();
    }

    prevButton.addEventListener('click', () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        updateCarousel();
    });

    track.addEventListener('pointerdown', pointerDown);
    track.addEventListener('pointerup', pointerUp);
    track.addEventListener('pointerleave', pointerUp);
    track.addEventListener('pointermove', pointerMove);

    function pointerDown(e) {
        isDragging = true;
        startX = e.clientX;
        track.style.transition = 'none';
        carousel.classList.add('dragging');
    }

    function pointerMove(e) {
        if (!isDragging) return;
        const currentX = e.clientX;
        const diff = currentX - startX;
        track.style.transform = `translateX(${currentTranslate + diff}px)`;
    }

    function pointerUp(e) {
        if (!isDragging) return;
        isDragging = false;
        carousel.classList.remove('dragging');
        const endX = e.clientX;
        const diff = endX - startX;
        if (diff < -50 && currentIndex < items.length - 1) {
            currentIndex++;
        } else if (diff > 50 && currentIndex > 0) {
            currentIndex--;
        }
        track.style.transition = 'transform 0.3s ease';
        updateCarousel();
    }

    window.addEventListener('resize', updateCarousel);
    createIndicators();
    updateCarousel();
}

