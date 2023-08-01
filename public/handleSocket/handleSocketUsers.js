import { usersContainer } from "../elements.js";
import { socket } from "../main.js";

export const handleSocketUsers = (users) => {
  console.log(users);
  usersContainer.innerHTML = "";
  users.forEach((user) => {
    let name;
    let button;

    if (user.id !== socket.id) {
      name = document.createElement("span");
      name.innerText = user.name;

      button = document.createElement("button");
      button.innerText = "Invite";
      button.addEventListener("click", () => {
        console.log(user.name, user.id);
        button.innerText = "Invited";
        setTimeout(() => (button.innerText = "Invite"), 1500);
        socket.emit("invite", user.id);
      });
    } else {
      name = document.createElement("b");
      name.innerText = user.name;
    }

    const row = document.createElement("li");
    row.className = "user";
    row.insertAdjacentElement("beforeend", name);
    button && row.insertAdjacentElement("beforeend", button);

    usersContainer.insertAdjacentElement("afterbegin", row);
  });
}