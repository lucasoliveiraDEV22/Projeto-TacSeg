/*--------------------Scroll-Animation---------------------- */
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.scroll-fade');
  let lastScrollY = window.scrollY;
  
    window.addEventListener('scroll', function () {
      const currentScrollY = window.scrollY;
  
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        
        if (currentScrollY > lastScrollY) {
          // Rolando para baixo
          if (currentScrollY + window.innerHeight > sectionTop) {
            section.classList.add('visible');
            section.classList.remove('hidden');
          }
        } else {
          // Rolando para cima
          if (currentScrollY + window.innerHeight < sectionTop + section.offsetHeight) {
            section.classList.add('hidden');
            section.classList.remove('visible');
          }
        }
      });
      lastScrollY = currentScrollY;
    });
  });