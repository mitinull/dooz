import { turnHeading } from "../elements.js";
import { goToBoardPage } from "../goToPage.js";
import { gameState } from "../main.js";

export const handleSocketAcceptInvite = (opponent) => {
  gameState.currentTurn = "O";
  gameState.opponentName = opponent.name;
  gameState.playerShape = "O";
  turnHeading.innerHTML = "Your Turn!";
  goToBoardPage();
  alert(
    `You're invite is accepted by "${opponent.name}". congrats!🎉`
  );
};
