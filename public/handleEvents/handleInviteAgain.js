import { socket } from "../main.js";

export const handleInviteAgain = () => {
  socket.emit("inviteAgain");
};
