import {
  cells,
  chatForm,
  inviteAgainButton,
  leaveButton,
} from "./elements.js";
import { handleAction } from "./handleEvents/handleAction.js";
import { handleInviteAgain } from "./handleEvents/handleInviteAgain.js";
import { handleLeave } from "./handleEvents/handleLeave.js";
import { handleSendMessage } from "./handleEvents/handleSendMessage.js";
import { handleSocketChat } from "./handleSocket/handleSocketChat.js";
import { handleSocketInvite } from "./handleSocket/handleSocketInvite.js";
import { handleSocketAcceptInvite } from "./handleSocket/handleSocketAcceptInvite.js";
import { handleSocketUsers } from "./handleSocket/handleSocketUsers.js";
import { handleSocketAction } from "./handleSocket/handleSocketAction.js";

export const gameState = {
  playerShape: "",
  currentTurn: "O",
  opponentName: "",
  gameIsOver: false,
};

if (!localStorage.getItem("name")) {
  const name = prompt("Enter your beautiful name:");
  localStorage.setItem("name", name);
}

export const socket = io({
  query: {
    name: localStorage.getItem("name"),
  },
});

leaveButton.addEventListener("click", handleLeave);

inviteAgainButton.addEventListener("click", handleInviteAgain);

chatForm.addEventListener("submit", (e) => handleSendMessage(e));

cells.forEach((cell, i) => {
  cell.addEventListener("click", () => handleAction(cell, i));
});

socket.on("chat", (message) => handleSocketChat(message));

socket.on("invite", (opponent) => handleSocketInvite(opponent));

socket.on("acceptInvite", (opponent) =>
  handleSocketAcceptInvite(opponent)
);

socket.on("users", (users) => handleSocketUsers(users));

socket.on("action", (cellIndex) => handleSocketAction(cellIndex));
