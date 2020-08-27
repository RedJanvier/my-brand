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
