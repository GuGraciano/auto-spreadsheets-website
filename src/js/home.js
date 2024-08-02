let currentSlide = 0;
const slideInterval = 3000; // Tempo em milissegundos (3 segundos)

const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

// Create indicators dynamically
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

    // Update indicators
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
}

// Initial slide
showSlide(currentSlide);

// Auto-slide functionality
let autoSlideInterval = setInterval(nextSlide, slideInterval);

// Stop auto-slide on hover
document.querySelector('.carousel').addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

// Resume auto-slide when not hovering
document.querySelector('.carousel').addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(nextSlide, slideInterval);
});
