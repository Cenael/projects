// pagina di login, campo di imput dove mettere un username e bottone login.
// Quando logghi cambi pagina nella quale c'è il tasto log out, un input dove aggiungere un nome e il tasto aggiungi.
// Sotto spuntano i nomi aggiunti con due bottoni accanto: elimina e un prompt nel quale aggiungere tre aggettivi. questi aggettivi possono essere eliminati solo dall'user che li ha creati.

let isLogged = false;
const loginButton = document.getElementById("loginbtn");
const usernameInput = document.getElementById("username");
loginButton.disabled = true;

function checkInput() {
  if (usernameInput.value !== "") {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

function logIn() {
  if (usernameInput.value !== "") {
    isLogged = true;
    localStorage.setItem("isLogged", isLogged);
    // window.location.reload();
    window.location.href = "app.html";
    localStorage.setItem("username", usernameInput.value);
  } else {
    alert("Inserisci un nome valido");
  }
}

usernameInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    logIn();
  }
});
usernameInput.addEventListener("input", checkInput);

loginButton.addEventListener("click", logIn);
