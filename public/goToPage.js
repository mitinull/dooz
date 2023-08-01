import {
  boardPage,
  cells,
  chatsContainer,
  inviteAgainButton,
  usersPage,
} from "./elements.js";
import { gameState } from "./main.js";

export const goToListPage = () => {
  boardPage.style.display = "none";
  usersPage.style.display = "block";
};

export const goToBoardPage = () => {
  boardPage.style.display = "block";
  usersPage.style.display = "none";
  inviteAgainButton.hidden = true;
  gameState.gameIsOver = false;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.background = "#111";
  });
  chatsContainer.innerHTML = "";
};
