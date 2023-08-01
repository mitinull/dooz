const handleAction = (cellIndex, socket, io) => {
  if (!socket.data.opponentId) return;
  const opponentSocket = io.sockets.sockets.get(
    socket.data.opponentId
  );
  socket.emit("action", cellIndex);
  opponentSocket.emit("action", cellIndex);
};

module.exports = handleAction;
