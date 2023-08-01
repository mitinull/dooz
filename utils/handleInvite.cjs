let i = 0;

const handleInvite = (id, socket, io) => {
  console.log(socket.handshake.query.name, "invited", id);
  console.log("Invite number:", ++i);

  // Send a message to invitedUser
  const invitedUserSocket = io.sockets.sockets.get(id);
  if (!invitedUserSocket) return;
  invitedUserSocket.emit("invite", {
    name: socket.handshake.query.name,
    id: socket.id,
  });
};

module.exports = handleInvite;
