const { WebSocket } = require("./ws/WebSocket");

const websocket = new WebSocket();

const { argv } = process;

for (let i = 0; i < argv.slice(2).length; i += 2) {
  websocket.addCommand(argv[i], argv[i + 1]);
}

websocket.open();
