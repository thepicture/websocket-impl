const net = require("node:net");
const crypto = require("node:crypto");

const ACCEPT_HASH = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";

class WebSocket {
  constructor(hostname = "127.0.0.1", port = 8080) {
    this.hostname = hostname;
    this.port = port;
    this.cases = {};
    this.connectedClients = {};
  }

  addCommand(command, response) {
    this.cases[command] = response;
  }

  async open() {
    this.server = net.createServer((socket) => {
      const readData = (data) => {
        const content = data.toString("utf-8");
        if (content.includes("GET / HTTP/1.1")) {
          socket.write("HTTP/1.1 101 Switching Protocols\r\n");
          socket.write("Upgrade: websocket\r\n");
          socket.write("Connection: Upgrade\r\n");
          socket.write(
            `Sec-WebSocket-Accept: ${this._getSecWebSocketAccept(
              content.match(/Sec-WebSocket-Key: (.+)/i)[1]
            )}\r\n\r\n`
          );
        } else {
          const array = [...data];
          const MASK = array.slice(2, 6);
          const ENCODED = array.slice(6, -1);
          const buffer = Buffer.from(
            Uint8Array.from(ENCODED, (e, i) => e ^ MASK[i % 4])
          );
          const command = buffer.toString("utf-8");
          try {
            this._respond(socket, this._getResponse(command));
          } catch {
            this._respond(socket, "command not found");
          }
        }
      };

      socket.on("data", readData);
      socket.on("close", (err) => {
        socket.removeListener("data", readData);
        if (err) console.error(err);
      });
    });

    this.server.listen(this.port, this.hostname);

    let connectedClients = [];

    this.server.on("connection", (socket) => {
      connectedClients.push(socket);
      socket.on("close", () => {
        connectedClients = connectedClients.filter(
          (client) => client !== socket
        );
      });
    });
  }

  async close() {
    await new Promise((resolve, reject) => {
      this.server.on("close", resolve);
      this.server.on("error", reject);

      this.server.close();
    });
  }

  _getSecWebSocketAccept(secWebSocketKey) {
    return crypto
      .createHash("sha1")
      .update(secWebSocketKey + ACCEPT_HASH)
      .digest("base64");
  }

  _getResponse(command) {
    return this.cases[command];
  }

  _respond(socket, message) {
    const buffer = Buffer.from(message, "utf-8");

    const data = [];
    data.push(0b10000001);
    data.push(buffer.length);

    for (let i = 0; i < buffer.length; i++) {
      data.push(buffer[i]);
    }

    socket.write(Buffer.from(data));
  }
}

module.exports = {
  WebSocket,
};
