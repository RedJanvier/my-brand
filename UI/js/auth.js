let globalUser = {
  name: "",
  email: "",
  uid: "",
};
const auth = firebase.auth();
window.addEventListener("DOMContentLoaded", () => {
  const logoutBtns = document.querySelectorAll("#logout-btn");

  auth.onAuthStateChanged((user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      globalUser = user;
      const {
        email,
        providerData: [{ providerId: provider }],
      } = user;
      if (provider !== "password") return redirectTo("/index.html");
      console.log(`${email} just logged in. Enjoy the best blog ever....`);
    } else {
      redirectTo("/admin");
    }
  });

  for (let i = 0; i < logoutBtns.length; i++) {
    logoutBtns[i].addEventListener("click", () => {
      disableButton(logoutBtn);
      localStorage.clear();
      auth.signOut().catch(console.log);
    });
  }
});
