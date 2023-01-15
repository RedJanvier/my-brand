let slide = 1;
function initSlides(delaySeconds = 5){
  showSlides(slide);
  setInterval(() => changeSlide(1), delaySeconds * 1000);
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