import { changeName } from "../changeName.js";
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
        button.innerText = "Invited";
        setTimeout(() => (button.innerText = "Invite"), 1500);
        socket.emit("invite", user.id);
      });
    } else {
      name = document.createElement("b");
      name.innerText = user.name;
      button = document.createElement("button");
      button.innerText = "Rename";
      button.addEventListener("click", () => {
        const shouldReload = changeName();
        if (shouldReload) location.reload();
      });
    }

    const row = document.createElement("li");
    row.className = "user";
    row.insertAdjacentElement("beforeend", name);
    row.insertAdjacentElement("beforeend", button);

    usersContainer.insertAdjacentElement("afterbegin", row);
  });
};
