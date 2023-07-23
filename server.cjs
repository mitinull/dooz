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

const server = expressApp.listen(3000, () => {
  console.log("express app is running on port 3000");
});

const io = socket(server);

io.on("connection", function (socket) {
  console.log("Made socket connection");

  socket.on("click", (cellIndex) => {
    console.log("clicked", cellIndex);
    io.emit("click", cellIndex);
  });
});
