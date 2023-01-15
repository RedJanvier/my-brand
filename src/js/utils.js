export function showErrorIn(
  element,
  message = "Some error occurred! Please try again"
) {
  element.textContent = message;
  element.style.display = "block";
  scrollTo(element.id);
  setTimeout(() => {
    element.style.display = "none";
  }, 5000);
}
export function disableButton(btn) {
  return (btn.disabled = "disabled");
}
export function enableButton(btn) {
  return (btn.disabled = "");
}
export function redirectTo(path) {
  return (location.href = location.href.includes("github")
    ? `/my-brand/ui${path}`
    : path);
}
export function rounder(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}
export function enableLoader() {
  document.querySelector(".loading").style.display = "flex";
}
export function disableLoader() {
  document.querySelector(".loading").style.display = "none";
}
export function scrollTo(id) {
  return (location.href = `#${id}`);
}
export const regexes = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^[a-zA-Z\d\s.!@#$%&*()_+-=:?]{6,}$/,
  title: /^[a-zA-Z\d\s'!.?&%$#-_=+]{10,}$/,
  name: /^[a-zA-Z\d\s]{10,}$/,
  live: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  code: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
  body: /^[\w\s&<>\/!\\\?=.,:;@#\$%\^&\)\(`~'*"]{2,}$/,
  message: /^[a-zA-Z\d\s&<>\/]{10,}$/,
};
export function validate(e) {
  const value = e.value.trim();
  if (!regexes[e.name].test(value)) {
    e.classList.add("form__field-error");
    return false;
  }
  e.classList.remove("form__field-error");
  return true;
}
