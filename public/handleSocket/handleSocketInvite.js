import { turnHeading } from "../elements.js";
import { goToBoardPage } from "../goToPage.js";
import { gameState, socket } from "../main.js";

export const handleSocketInvite = (opponent) => {
  const accept = confirm(
    `You are invited by "${opponent.name}". Do you want to play?`
  );
  if (!accept) {
    socket.emit("dennyInvite", opponent.id);
    return;
  }
  console.log(opponent.name);

  gameState.currentTurn = "O";
  gameState.opponentName = opponent.name;
  socket.emit("acceptInvite", opponent.id);
  gameState.playerShape = "X";
  turnHeading.innerHTML = `${gameState.opponentName}'s Turn ...`;
  goToBoardPage();
};
