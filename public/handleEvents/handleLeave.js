import { socket } from "../main.js";
import { goToListPage } from "../goToPage.js";

export const handleLeave = () => {
  goToListPage();
  socket.emit("leave");
};
