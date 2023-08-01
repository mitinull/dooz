const extractIdsAndNames = (io) =>
  [...io.sockets.sockets.values()].map((socket) => ({
    name: socket.data.name,
    id: socket.id,
  }));

module.exports = extractIdsAndNames;
