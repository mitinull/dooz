const handleDisconnect = (socket, io) => {
  const disconnectedUserIndex = connectedUsers.findIndex(
    (user) => user.id === socket.id
  );
  connectedUsers.splice(disconnectedUserIndex, 1);
  io.emit("users", connectedUsers);
  console.log("disconnected");
};

module.exports = handleDisconnect;
