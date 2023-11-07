export async function editor(req, res) {
  res.send("this is test");
}

const activeConnections = new Set();
export async function wsEditor(
  connection /* SocketStream */,
  req /* FastifyRequest */
) {
  // Store the connection in the activeConnections Set
  activeConnections.add(connection);

  connection.socket.on("message", (message) => {
    //Broadcast message to all the connections
    activeConnections.forEach((client) => {
      if (client !== connection) {
        client.socket.send(message);
      }
    });
  });

  connection.socket.on("close", () => {
    //remove connection when it is closed
    activeConnections.delete(connection);
  });
}
