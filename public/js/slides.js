let slide = 1;
function initSlides(){
  showSlides(slide);
}
function changeSlide(n) {
  showSlides((slide += n));
}
function currentSlide(n) {
  showSlides((slide = n));
}
function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("slides");
  if (n > slides.length) {
    slide = 1;
  }
  if (n < 1) {
    slide = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slide - 1].style.display = "flex";
}

initSlides();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

const fadeInElements = document.querySelectorAll('.fade-in-text');
fadeInElements.forEach(el => observer.observe(el));
