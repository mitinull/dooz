import { gameState, socket } from "../main.js";

export const handleAction = (cell, i) => {
  if (gameState.playerShape !== gameState.currentTurn) return;
  if (cell.innerHTML !== "") return;
  if (gameState.gameIsOver) return;
  socket.emit("action", i);
};
