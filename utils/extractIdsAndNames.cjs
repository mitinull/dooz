const extractIdsAndNames = (io) =>
  [...io.sockets.sockets.values()].map((socket) => ({
    name: socket.handshake.query.name,
    id: socket.id,
  }));

module.exports = extractIdsAndNames;
