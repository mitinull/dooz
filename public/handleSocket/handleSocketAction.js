import {
  cells,
  inviteAgainButton,
  turnHeading,
} from "../elements.js";
import { gameState } from "../main.js";
import { winnerCells } from '../winnerCells.js';

export const handleSocketAction = (cellIndex) => {
  cells[cellIndex].textContent = gameState.currentTurn;
  gameState.currentTurn = gameState.currentTurn === "O" ? "X" : "O";
  const winnerResult = winnerCells(cells);
  if (!winnerResult) {
    turnHeading.innerHTML =
      gameState.currentTurn === gameState.playerShape
        ? "Your Turn!"
        : `${gameState.opponentName}'s Turn ...`;
  } else {
    gameState.gameIsOver = true;
    inviteAgainButton.textContent = `Invite "${gameState.opponentName}" again!`;
    inviteAgainButton.hidden = false;
    if (winnerResult === "draw") {
      turnHeading.innerHTML = "DRAW. :|";
    } else if (winnerResult.winner === gameState.playerShape) {
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
};
