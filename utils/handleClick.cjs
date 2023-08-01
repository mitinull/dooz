const handleClick = (cellIndex, socket, io) => {
  if (!socket.data.opponentId) return;
  const opponentSocket = io.sockets.sockets.get(
    socket.data.opponentId
  );
  socket.emit("click", cellIndex);
  opponentSocket.emit("click", cellIndex);
};

module.exports = handleClick;
