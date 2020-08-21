const drop = document.querySelector(".navbar .profile-drop");
document
  .querySelector(".navbar .author__profile")
  .addEventListener("click", () => {
    drop.classList.toggle("hide");
  });
drop.addEventListener("click", () => drop.classList.toggle("hide"));
