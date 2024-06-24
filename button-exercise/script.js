// permette di loggare o sloggare, poter salvare una lista di ToDo associata all'utente
// Inserire delle cose da fare
// come utente voglio poter vedere solo le cose che ho inserito

class App {
  username = "";
  toDoList = [{ user: "", toDo: "" }];

  login(username) {
    if (!!this.username) {
      console.log("Already logged in");
    } else {
      this.username = username;
      this.toDoList[0].user = username;
    }
  }

  addItem(item) {
    if (!!this.username) {
      this.toDoList = this.toDoList.map((toDos) => {
        if (toDos.user === this.username) {
          this.toDoList.hidden = true;
          return { ...toDos, toDo: item };
        } else {
          console.log("You must be logged in");
          return { ...toDos };
        }
      });
    }
  }

  logout() {
    if (!!this.username) {
      this.username = "";
    } else {
      console.log("Already logged out");
    }
  }
}

const app = new App();
