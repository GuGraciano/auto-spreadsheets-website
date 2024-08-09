let currentSlide = 0;
const slideInterval = 3000; // Tempo em milissegundos (3 segundos)

const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

// Cria indicadores dinamicamente
const indicatorsContainer = document.querySelector('.carousel-indicators');
slides.forEach((_, i) => {
    const indicator = document.createElement('div');
    indicator.className = 'carousel-indicator';
    indicator.addEventListener('click', () => goToSlide(i));
    indicatorsContainer.appendChild(indicator);
});

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
    document.querySelector('.carousel-images').style.transform = `translateX(-${index * 100}%)`;

    // Atualiza indicadores
    document.querySelectorAll('.carousel-indicator').forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
    clearInterval(autoSlideInterval); // Pausa o auto-slide
    autoSlideInterval = setInterval(nextSlide, slideInterval); // Reinicia o auto-slide
}

// Slide inicial
showSlide(currentSlide);

// Auto-slide functionality
let autoSlideInterval = setInterval(nextSlide, slideInterval);

// Para o auto-slide ao passar o mouse sobre o carrossel
document.querySelector('.carousel').addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

// Retoma o auto-slide quando o mouse sai do carrossel
document.querySelector('.carousel').addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(nextSlide, slideInterval);
});
