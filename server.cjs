const express = require("express");
const socket = require("socket.io");
const rateLimit = require("express-rate-limit");

const expressApp = express();

const limiter = rateLimit({
  windowMs: 1000,
  max: 5,
});

expressApp.set("view engine", "ejs");
expressApp.use(express.static("public"));
expressApp.use(express.static(__dirname + "/public"));
expressApp.use(limiter);

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
  socket.data.name = socket.handshake.query.name;
  const namesArray = [];
  io.sockets.sockets.forEach((socket) =>
    namesArray.push({ name: socket.data.name, id: socket.id })
  );
  io.emit("users", namesArray);

  let i = 0;
  socket.on("invite", (id) => {
    console.log(socket.id, "invited", id);
    console.log(++i);

    // Send a message to invitedUser
    const invitedUserSocket = io.sockets.sockets.get(id);
    if (!invitedUserSocket) return;
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
    const opponentSocket = io.sockets.sockets.get(
      socket.data.opponentId
    );
    socket.emit("click", cellIndex);
    opponentSocket.emit("click", cellIndex);
  });

  socket.on("chat", (message) => {
    console.log(message);
    const opponentSocket = io.sockets.sockets.get(
      socket.data.opponentId
    );

    if (!opponentSocket) return;

    const formattedMessage =
      `<b>${socket.handshake.query.name}:</b> ` + message;
    socket.emit("chat", formattedMessage);
    opponentSocket.emit("chat", formattedMessage);
  });
});
