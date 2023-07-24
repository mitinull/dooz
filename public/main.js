if (!localStorage.getItem("name")) {
  const name = prompt("Enter your beautiful name:");
  localStorage.setItem("name", name);
}

const socket = io({
  query: {
    name: localStorage.getItem("name"),
  },
});

const cells = document.querySelectorAll(".cell");

const usersContainer = document.querySelector(".users");

cells.forEach((cell, i) => {
  cell.addEventListener("click", () => {
    socket.emit("click", i);
  });
});

socket.on("invite", (opponent) => {
  alert("You are invited. congrats!🎉");
  console.log(opponent.name);
  socket.emit("acceptInvite", opponent.id);
});

let shape = "circle";

socket.on("acceptInvite", () => {
  alert("You're invite is accepted. congrats!🎉");
});

socket.on("users", (users) => {
  console.log(users);
  usersContainer.innerHTML = "";
  users.forEach((user) => {
    const name = document.createElement("span");
    name.innerText = user.name;

    const button = document.createElement("button");
    button.innerText = "Invite";
    button.addEventListener("click", () => {
      console.log(user.name, user.id);
      button.innerText = "Invited";
      socket.emit("invite", user.id);
    });

    const row = document.createElement("div");
    row.insertAdjacentElement("beforeend", name);
    row.insertAdjacentElement("beforeend", button);

    usersContainer.insertAdjacentElement("afterbegin", row);
  });
});

socket.on("click", (cellIndex) => {
  cells[cellIndex].textContent = shape;
  shape = shape === "circle" ? "cross" : "circle";
});
