let globalUser = {
  name: "",
  email: "",
  uid: "",
};
const auth = firebase.auth();
window.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.querySelector("#logout-btn");

  auth.onAuthStateChanged((user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      globalUser = user;
      const { email } = user;
      const { email: mail, displayName, uid } = auth.currentUser;
      console.log(`${email} just logged in. Enjoy the best blog ever....`);

      globalUser.email = mail;
      globalUser.name = displayName;
      globalUser.uid = uid;
    } else {
      redirectTo("/admin");
    }
  });

  logoutBtn.addEventListener("click", () => {
    disableButton(logoutBtn);
    localStorage.clear();
    auth.signOut().catch(console.log);
  });
});
