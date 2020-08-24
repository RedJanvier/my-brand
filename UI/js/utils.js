function showErrorIn(
  element,
  message = "Some error occurred! Please try again"
) {
  element.textContent = message;
  element.style.display = "block";
  setTimeout(() => {
    element.style.display = "none";
  }, 10000);
}
function disableButton(btn) {
  return (btn.disabled = "disabled");
}
function enableButton(btn) {
  return (btn.disabled = "");
}
function redirectTo(path) {
  return (location.href = location.href.includes("github")
    ? `/my-brand/ui${path}`
    : `/ui${path}`);
}
function rounder(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}
function enableLoader() {
  document.querySelector(".loading").style.display = "flex";
}
function disableLoader() {
  document.querySelector(".loading").style.display = "none";
}
const regexes = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  title: /^[a-zA-Z\d\s]{10,}$/,
  body: /^[a-zA-Z\d\s&<>\/]{10,}$/,
};

function validate(e) {
  const value = e.value.trim();
  if (!regexes[e.name].test(value)) {
    return e.classList.add("form__field-error");
  }
  e.classList.remove("form__field-error");
}
