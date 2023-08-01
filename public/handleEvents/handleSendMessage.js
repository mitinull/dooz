import { chatInput } from "../elements.js";
import { socket } from "../main.js";

export const handleSendMessage = (e) => {
  e.preventDefault();
  const message = chatInput.value;
  if (!message) return;
  chatInput.value = "";
  socket.emit("chat", message);
};
