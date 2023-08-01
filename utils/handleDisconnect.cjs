const extractIdsAndNames = require("./extractIdsAndNames.cjs");

const handleDisconnect = (socket, io) => {
  io.emit("users", extractIdsAndNames(io));
  console.log("disconnected");
};

module.exports = handleDisconnect;
