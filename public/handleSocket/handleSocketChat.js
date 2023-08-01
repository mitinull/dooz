import { chatsContainer } from "../elements.js";

export const handleSocketChat = (message) => {
  chatsContainer.insertAdjacentHTML(
    "beforeend",
    `<div>${message}</div>`
  );
};
