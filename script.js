// const node = document.getElementById("button");

// // function onClick() {
// //   const buttonClicked = localStorage.getItem("buttonClicked");
// //   if (!!buttonClicked) {
// //     console.log("already clicked");
// //     localStorage.removeItem("buttonClicked");
// //   } else {
// //     console.log("welcome");
// //     localStorage.setItem("buttonClicked", "true");
// //   }
// // }

// node.addEventListener("click", onClick);
const nodeWelcome = document.createElement("h1");
const nodeButtonLogout = document.createElement("button");
const nodeButtonLogin = document.createElement("button");
const nodeRoot = document.getElementById("root");

function onDocumentReady() {
  const isLogged = localStorage.getItem("isLogged");
  if (isLogged === "true") {
    nodeWelcome.textContent = "Welcome";
    document.body.appendChild(nodeWelcome);
    nodeButtonLogout.textContent = "Logout";
    document.body.appendChild(nodeButtonLogout);
    function onButtonLogoutClick() {
      localStorage.removeItem("isLogged");
      window.location.reload();
    }
    nodeButtonLogout.addEventListener("click", onButtonLogoutClick);
  } else {
    nodeButtonLogin.textContent = "Login";
    nodeRoot.appendChild(nodeButtonLogin);
    function onButtonLoginClick() {
      if (localStorage.getItem(!!"isLogged")) {
        localStorage.removeItem("isLogged");
      } else {
        localStorage.setItem("isLogged", "true");
        window.location.reload();
      }
    }

    nodeButtonLogin.addEventListener("click", onButtonLoginClick);
  }
}
document.addEventListener("DOMContentLoaded", onDocumentReady);
