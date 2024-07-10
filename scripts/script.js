

function prevSlide() {
  const slides = document.querySelectorAll('.slider input');
  let currentIndex;
  slides.forEach((slide, index) => {
    if (slide.checked) {
      currentIndex = index;
    }
  });
  slides[(currentIndex - 1 + slides.length) % slides.length].checked = true;
}

function nextSlide() {
  const slides = document.querySelectorAll('.slider input');
  let currentIndex;
  slides.forEach((slide, index) => {
    if (slide.checked) {
      currentIndex = index;
    }
  });
  slides[(currentIndex + 1) % slides.length].checked = true;





}
