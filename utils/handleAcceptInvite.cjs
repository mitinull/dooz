const handleAcceptInvite = (id, socket, io) => {
  {
    console.log(socket.handshake.query.name, "acceptInvited", id);
    socket.data.opponentId = id;

    const acceptInvitedUserSocket = io.sockets.sockets.get(id);
    acceptInvitedUserSocket.data.opponentId = socket.id;

    acceptInvitedUserSocket.emit("acceptInvite", {
      name: socket.handshake.query.name,
    });
  }
};

module.exports = handleAcceptInvite;
