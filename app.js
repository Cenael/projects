let isLogged = false;
const nodeButtonLogout = document.getElementById("logoutButton");
const nodeButtonLogin = document.getElementById("loginButton");
const nodeWelcome = document.createElement("h1");
nodeButtonLogout.hidden = true;
nodeButtonLogin.hidden = false;
function onClickButton() {
  if (isLogged === false) {
    isLogged = true;
    localStorage.setItem("isLogged", isLogged);
    nodeWelcome.textContent = "Welcome";
    document.body.appendChild(nodeWelcome);
    nodeButtonLogin.hidden = true;
    nodeButtonLogout.hidden = false;
  }
}

function logout() {
  isLogged = false;
  localStorage.setItem("isLogged", isLogged);
  nodeButtonLogout.hidden = true;
  nodeButtonLogin.hidden = false;
  nodeWelcome.remove();
}

function checkLogged() {
  if (localStorage.getItem("isLogged") === "true") {
    onClickButton();
  } else {
    logout();
  }
}

window.addEventListener("load", checkLogged);
nodeButtonLogin.addEventListener("click", onClickButton);
nodeButtonLogout.addEventListener("click", logout);
