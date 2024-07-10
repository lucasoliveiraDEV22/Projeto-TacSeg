let currentTestimonialIndex = 0;

function showTestimonialSlide(index) {
    const carouselInner = document.querySelector('.testimonial-carousel .carousel-inner');
    const totalSlides = document.querySelectorAll('.testimonial-card').length;
    currentTestimonialIndex = (index + totalSlides) % totalSlides; // Garantir que o índice esteja dentro dos limites
    carouselInner.style.transform = `translateX(-${currentTestimonialIndex * 100}%)`;
}

function prevTestimonialSlide() {
    showTestimonialSlide(currentTestimonialIndex - 1);
}

function nextTestimonialSlide() {
    showTestimonialSlide(currentTestimonialIndex + 1);
}

document.addEventListener('DOMContentLoaded', () => {
    showTestimonialSlide(currentTestimonialIndex); // Mostrar o slide inicial
});


