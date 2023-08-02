const express = require("express");
const socket = require("socket.io");
const rateLimit = require("express-rate-limit");

const extractIdsAndNames = require("./utils/extractIdsAndNames.cjs");
const handleAcceptInvite = require("./utils/handleAcceptInvite.cjs");
const handleChat = require("./utils/handleChat.cjs");
const handleAction = require("./utils/handleAction.cjs");
const handleDisconnect = require("./utils/handleDisconnect.cjs");
const handleInvite = require("./utils/handleInvite.cjs");
const handleInviteAgain = require("./utils/handleInviteAgain.cjs");

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

const server = expressApp.listen(3000, () => {
  console.log("express app is running on port 3000");
});

const io = socket(server);

io.on("connection", function (socket) {
  console.log(socket.handshake.query.name, "connected!");

  io.emit("users", extractIdsAndNames(io));

  socket.on("disconnect", () => {
    handleDisconnect(socket, io);
  });

  socket.on("invite", (id) => {
    handleInvite(id, socket, io);
  });

  socket.on("acceptInvite", (id) => {
    handleAcceptInvite(id, socket, io);
  });

  socket.on("inviteAgain", () => {
    handleInviteAgain(socket, io);
  });

  socket.on("action", (cellIndex) => {
    handleAction(cellIndex, socket, io);
  });

  socket.on("chat", (message) => {
    handleChat(message, socket, io);
  });
});
