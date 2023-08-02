const extractIdsAndNames = require("./extractIdsAndNames.cjs");

const handleDisconnect = (socket, io) => {
  io.emit("users", extractIdsAndNames(io));
  console.log(socket.handshake.query.name, "disconnected!");
};

module.exports = handleDisconnect;
