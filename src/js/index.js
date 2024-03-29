let slide = 1;
export function initSlides(delaySeconds = 5){
  showSlides(slide);
  setInterval(() => changeSlide(1), delaySeconds * 1000);
}
export function changeSlide(n) {
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
// const db = firebase.firestore();
// const contactForm = document.querySelector(".contact-form");

// contactForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const name = contactForm.name.value.trim();
//   const email = contactForm.email.value.trim();
//   const message = contactForm.message.value.trim();

//   if (
//     !validate(contactForm.name) ||
//     !validate(contactForm.email) ||
//     !validate(contactForm.message)
//   )
//     return showErrorIn(
//       contactForm.querySelector("#error-panel"),
//       "Please fill all form fields!"
//     );
//   const queryData = {
//     message,
//     email,
//     name,
//     createdAt: Date.now(),
//   };

//   fetch("https://redjanvier.herokuapp.com/api/query", {
//     method: "POST",
//     body: queryData,
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//     },
//   })
//     .then((res) => res.json())
//     .then(({ data }) => {
//       console.log("Query submitted with id: ", data._id);
//       setTimeout(() => redirectTo("/index.html"), 800);
//     })
//     .catch((err) => {
//       showErrorIn(contactForm.querySelector("#error-panel"), err.message);
//     });
// });
