import { winnerCells } from "./winnerCells.js";

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
const turnHeading = document.querySelector("#turn");
const inviteAgainButton = document.querySelector(".invite-again");

const goToListPage = () => {
  boardPage.style.display = "none";
  usersPage.style.display = "block";
};

const goToBoardPage = () => {
  boardPage.style.display = "block";
  usersPage.style.display = "none";
  inviteAgainButton.hidden = true;
  gameIsOver = false;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.background = "#111";
  });
  chatsContainer.innerHTML = "";
};

leaveButton.addEventListener("click", () => {
  goToListPage();
  socket.emit("leave");
});

inviteAgainButton.addEventListener("click", () => {
  socket.emit("inviteAgain");
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
let opponentName = "";
let gameIsOver = false;

cells.forEach((cell, i) => {
  cell.addEventListener("click", () => {
    if (playerShape !== currentShape) return;
    if (cells[i].innerHTML !== "") return;
    if (gameIsOver) return;
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
  currentShape = "O";
  opponentName = opponent.name;
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
  turnHeading.innerHTML = `${opponentName}'s Turn ...`;
  goToBoardPage();
});

socket.on("acceptInvite", (opponent) => {
  currentShape = "O";
  opponentName = opponent.name;
  alert(
    `You're invite is accepted by "${opponent.name}". congrats!🎉`
  );
  playerShape = "O";
  turnHeading.innerHTML = "Your Turn!";
  goToBoardPage();
});

socket.on("users", (users) => {
  console.log(users);
  usersContainer.innerHTML = "";
  users.forEach((user) => {
    let name;
    let button;

    if (user.id !== socket.id) {
      name = document.createElement("span");
      name.innerText = user.name;

      button = document.createElement("button");
      button.innerText = "Invite";
      button.addEventListener("click", () => {
        console.log(user.name, user.id);
        button.innerText = "Invited";
        setTimeout(() => (button.innerText = "Invite"), 1500);
        socket.emit("invite", user.id);
      });
    } else {
      name = document.createElement("b");
      name.innerText = user.name;
    }

    const row = document.createElement("li");
    row.className = "user";
    row.insertAdjacentElement("beforeend", name);
    button && row.insertAdjacentElement("beforeend", button);

    usersContainer.insertAdjacentElement("afterbegin", row);
  });
});

socket.on("click", (cellIndex) => {
  cells[cellIndex].textContent = currentShape;
  currentShape = currentShape === "O" ? "X" : "O";
  const winnerResult = winnerCells(cells);
  if (!winnerResult) {
    turnHeading.innerHTML =
      currentShape === playerShape
        ? "Your Turn!"
        : `${opponentName}'s Turn ...`;
  } else {
    gameIsOver = true;
    inviteAgainButton.textContent = `Invite "${opponentName}" again!`;
    inviteAgainButton.hidden = false;
    if (winnerResult === "draw") {
      turnHeading.innerHTML = "DRAW. :|";
    } else if (winnerResult.winner === playerShape) {
      turnHeading.innerHTML = "YOU WON! :)";
      for (let i of winnerResult.cells) {
        cells[i].style.background = "green";
      }
    } else {
      turnHeading.innerHTML = "YOU LOST. :(";
      for (let i of winnerResult.cells) {
        cells[i].style.background = "red";
      }
    }
  }
});
