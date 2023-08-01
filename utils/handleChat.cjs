const handleChat = (message, socket, io) => {
  const opponentSocket = io.sockets.sockets.get(
    socket.data.opponentId
  );

  if (!opponentSocket) return;

  const formattedMessage =
    `<b>${socket.handshake.query.name}:</b> ` + message;
  socket.emit("chat", formattedMessage);
  opponentSocket.emit("chat", formattedMessage);
};

module.exports = handleChat;
