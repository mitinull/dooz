const express = require("express");
const socket = require("socket.io");

const expressApp = express();

expressApp.set("view engine", "ejs");
expressApp.use(express.static("public"));

expressApp.use(express.static(__dirname + "/public"));

expressApp.get("/", (req, res) => {
  console.log("Root__Get!");
  res.render("room");
});

const connectedUsers = [];

const server = expressApp.listen(3000, () => {
  console.log("express app is running on port 3000");
});

const io = socket(server);

io.on("connection", function (socket) {
  console.log("Made socket connection");
  connectedUsers.push({
    id: socket.id,
    name: socket.handshake.query.name,
  });
  io.emit("users", connectedUsers);

  socket.on("disconnect", () => {
    const disconnectedUserIndex = connectedUsers.findIndex(
      (user) => user.id === socket.id
    );
    connectedUsers.splice(disconnectedUserIndex, 1);
    io.emit("users", connectedUsers);
    console.log("disconnected");
  });

  socket.on("click", (cellIndex) => {
    console.log("clicked", cellIndex);
    io.emit("click", cellIndex);
  });
});
