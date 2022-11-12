const drop = document.querySelector(".navbar .profile-drop");
if (location.href.includes("admin")) {
  const { photoURL: navImage } = JSON.parse(localStorage.getItem("user"));
  document.querySelector(".navbar .author__profile img").src =
    navImage || "/assets/img/blank_avatar.png";
}
document
  .querySelector(".navbar .author__profile")
  .addEventListener("click", () => {
    drop.classList.toggle("hide");
  });
drop.addEventListener("click", () => drop.classList.toggle("hide"));
