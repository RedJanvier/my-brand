let slide = 1;
showSlides(slide);
setInterval(() => changeSlide(1), 5000);
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

// contact form validations
const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name.length || !email.length || !message)
    return showErrorIn(
      contactForm.querySelector("#error-panel"),
      "Please fill all form fields!"
    );
});
