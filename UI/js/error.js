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
