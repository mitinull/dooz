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

  socket.on("invite", (id) => {
    console.log(socket.id, "invited", id);

    // Send a message to invitedUser
    const invitedUserSocket = io.sockets.sockets.get(id);
    invitedUserSocket.emit("invite", {
      name: socket.handshake.query.name,
      id: socket.id,
    });
  });

  socket.on("acceptInvite", (id) => {
    console.log(socket.id, "acceptInvited", id);
    socket.data.opponentId = id;

    const acceptInvitedUserSocket = io.sockets.sockets.get(id);
    acceptInvitedUserSocket.data.opponentId = socket.id;

    acceptInvitedUserSocket.emit("acceptInvite");
  });

  socket.on("disconnect", () => {
    const disconnectedUserIndex = connectedUsers.findIndex(
      (user) => user.id === socket.id
    );
    connectedUsers.splice(disconnectedUserIndex, 1);
    io.emit("users", connectedUsers);
    console.log("disconnected");
  });

  socket.on("click", (cellIndex) => {
    if (!socket.data.opponentId) return;
    console.log("clicked", socket.data.opponentId, cellIndex);
    opponentSocket = io.sockets.sockets.get(socket.data.opponentId);
    socket.emit("click", cellIndex);
    opponentSocket.emit("click", cellIndex);
  });
});
