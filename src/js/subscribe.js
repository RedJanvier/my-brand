const subscribeForm = document.querySelector(".subscribe-form");

subscribeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const errorBox = subscribeForm.querySelector("#error-panel");
  const email = subscribeForm.email.value;

  if (!validate(subscribeForm.email))
    return showErrorIn(errorBox, "Please fill in a valid email!");

  firebase
    .firestore()
    .collection("subscribers")
    .add({ email })
    .then(() => location.reload())
    .catch((err) => showErrorIn(errorBox));
});
