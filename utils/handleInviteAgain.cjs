const handleInviteAgain = (socket, io) => {
  const opponentSocket = io.sockets.sockets.get(
    socket.data.opponentId
  );
  if (!opponentSocket) return;

  opponentSocket.emit("invite", {
    name: socket.handshake.query.name,
    id: socket.id,
  });
};

module.exports = handleInviteAgain;
