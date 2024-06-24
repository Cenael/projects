const addButton = document.getElementById("addBtn");
const nameInput = document.getElementById("nameInput");
const elenco = document.getElementById("elenco");
const logoutBtn = document.getElementById("logoutBtn");
const welcomeElement = document.getElementById("welcome");
addButton.disabled = true;

function checkInput() {
  if (nameInput.value !== "") {
    addButton.disabled = false;
  } else {
    addButton.disabled = true;
  }
}

function giveWelcome() {
  const username = localStorage.getItem("username");
  if (username) {
    welcomeElement.textContent = `Congratulation ${username}, you are successfully logged in.`;
  }
}
giveWelcome();

function addItem() {
  if (nameInput.value !== "") {
    const itemName = nameInput.value;
    let listItem = document.getElementById(itemName);

    if (!listItem) {
      listItem = document.createElement("li");
      listItem.id = itemName;

      const textNode = document.createTextNode(itemName);
      listItem.appendChild(textNode);

      const addAggettivi = document.createElement("button");
      addAggettivi.textContent = "Add Abjectives";
      addAggettivi.addEventListener("click", () => {
        const aggettivi = prompt(
          "Inserisci tre aggettivi separati da una virgola"
        );
        if (aggettivi !== null && aggettivi !== "") {
          textNode.textContent = `${itemName} è : ${aggettivi}`;
          listItem.dataset.aggettivi = aggettivi;
          listItem.dataset.username = localStorage.getItem("username");
          localStorage.setItem(itemName, aggettivi);
          if (listItem.contains(addAggettivi)) {
            listItem.removeChild(addAggettivi);
          }

          const savedAggettivi = localStorage.getItem(itemName);
          if (savedAggettivi) {
            textNode.textContent = `${itemName} è: ${savedAggettivi}`;
            listItem.dataset.aggettivi = savedAggettivi;
            listItem.dataset.username = localStorage.getItem("username");
          }

          const modifyAggettivi = document.createElement("button");
          modifyAggettivi.textContent = "Modify Abjectives";
          modifyAggettivi.addEventListener("click", () => {
            const currentUsername = localStorage.getItem("username");
            const addedByUsername = listItem.dataset.username;
            if (currentUsername === addedByUsername) {
              const newAggettivi = prompt(
                "Inserisci tre nuovi aggettivi separati da una virgola"
              );
              if (newAggettivi !== null && newAggettivi !== "") {
                textNode.textContent = `${itemName} è : ${newAggettivi}`;
                listItem.dataset.aggettivi = newAggettivi;
              }
            } else {
              alert("Puoi modificare solo gli aggettivi che hai aggiunto.");
            }
          });

          const deleteAggettivi = document.createElement("button");
          deleteAggettivi.textContent = "Delete Abjectives";
          deleteAggettivi.addEventListener("click", () => {
            const currentUsername = localStorage.getItem("username");
            const addedByUsername = listItem.dataset.username;

            if (currentUsername === addedByUsername) {
              delete listItem.dataset.aggettivi;
              textNode.textContent = itemName;
              if (listItem.contains(deleteAggettivi)) {
                listItem.removeChild(deleteAggettivi);
              }

              if (!listItem.contains(addAggettivi)) {
                listItem.appendChild(addAggettivi);
              }
            } else {
              alert("Devi loggarti per poter eliminare i tuoi aggettivi");
            }
          });

          listItem.appendChild(modifyAggettivi);
          listItem.appendChild(deleteAggettivi);
        }
      });

      const deleteItem = document.createElement("button");
      deleteItem.textContent = "Delete User";
      deleteItem.addEventListener("click", () => {
        elenco.removeChild(listItem);
      });

      listItem.appendChild(addAggettivi);
      listItem.appendChild(deleteItem);
      elenco.appendChild(listItem);
    } else {
      // If item already exists, display existing aggettivi
      const existingAggettivi = listItem.dataset.aggettivi;
      if (existingAggettivi) {
        alert(
          `${itemName} è già stato aggiunto con gli aggettivi: ${existingAggettivi}`
        );
      } else {
        alert(`${itemName} è già stato aggiunto, ma non ha aggettivi.`);
      }
    }

    nameInput.value = "";
  } else {
    alert("Inserisci un nome valido");
  }
}

function pressEnter(event) {
  if (event.key === "Enter") {
    addItem();
  }
}

function logOut() {
  localStorage.removeItem("username");
  window.location.reload();
  window.location.href = "index.html";
  localStorage.removeItem("isLogged");
}

nameInput.addEventListener("input", checkInput);
addButton.addEventListener("click", addItem);
nameInput.addEventListener("keypress", pressEnter);
logoutBtn.addEventListener("click", logOut);
