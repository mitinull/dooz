if (!localStorage.getItem("name")) {
  const name = prompt("Enter your beautiful name:");
  localStorage.setItem("name", name);
}

const socket = io({
  query: {
    name: localStorage.getItem("name"),
  },
});

const boardPage = document.querySelector(".board-page");
const cells = document.querySelectorAll(".cell");
const usersPage = document.querySelector(".users-page");
const usersContainer = document.querySelector(".users");
const leaveButton = document.querySelector(".leave-button");
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const chatsContainer = document.querySelector("#chats");

const goToListPage = () => {
  boardPage.style.display = "none";
  usersPage.style.display = "block";
};

const goToBoardPage = () => {
  boardPage.style.display = "block";
  usersPage.style.display = "none";
  cells.forEach((cell) => {
    cell.textContent = "";
  });
  chatsContainer.innerHTML = "";
};

leaveButton.addEventListener("click", () => {
  goToListPage();
  socket.emit("leave");
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = chatInput.value;
  if (!message) return;
  chatInput.value = "";
  socket.emit("chat", message);
});

let currentShape = "O";
let playerShape = "";

cells.forEach((cell, i) => {
  cell.addEventListener("click", () => {
    if (playerShape !== currentShape) return;
    if (cells[i].innerHTML !== "") return;
    socket.emit("click", i);
  });
});

socket.on("chat", (message) => {
  chatsContainer.insertAdjacentHTML(
    "beforeend",
    `<div>${message}</div>`
  );
});

socket.on("invite", (opponent) => {
  const accept = confirm(
    `You are invited by "${opponent.name}". Do you want to play?`
  );
  if (!accept) {
    socket.emit("dennyInvite", opponent.id);
    return;
  }
  console.log(opponent.name);
  socket.emit("acceptInvite", opponent.id);
  playerShape = "X";
  goToBoardPage();
});

socket.on("acceptInvite", () => {
  alert("You're invite is accepted. congrats!🎉");
  playerShape = "O";
  goToBoardPage();
});

socket.on("users", (users) => {
  console.log(users);
  usersContainer.innerHTML = "";
  users.forEach((user) => {
    const name = document.createElement("span");
    name.innerText = user.name;

    const button = document.createElement("button");
    button.innerText = "Invite";
    button.addEventListener("click", () => {
      console.log(user.name, user.id);
      button.innerText = "Invited";
      socket.emit("invite", user.id);
    });

    const row = document.createElement("div");
    row.className = "user";
    row.insertAdjacentElement("beforeend", name);
    row.insertAdjacentElement("beforeend", button);

    usersContainer.insertAdjacentElement("afterbegin", row);
  });
});

socket.on("click", (cellIndex) => {
  cells[cellIndex].textContent = currentShape;
  currentShape = currentShape === "O" ? "X" : "O";
});
