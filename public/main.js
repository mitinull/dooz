const socket = io();

const cells = document.querySelectorAll(".cell");

cells.forEach((cell, i) => {
  cell.addEventListener("click", () => {
    socket.emit("click", i);
  });
});

socket.on("click", (cellIndex) => {
  cells[cellIndex].classList.add('circle')
});
