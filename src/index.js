const { WebSocket } = require("./ws/WebSocket");

const websocket = new WebSocket();

const args = process.argv.slice(2);

for (let i = 0; i < args.length; i += 2) {
  websocket.addCommand(args[i], args[i + 1]);
}

websocket.open();
