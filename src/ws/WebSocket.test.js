const { WebSocket } = require("./WebSocket");

const COMMAND1 = "time";
const RESPONSE1 = "08:00";

describe("WebSocket", () => {
  let websocket;

  beforeEach(() => {
    websocket = new WebSocket();

    websocket.addCommand(COMMAND1, RESPONSE1);
  });

  afterEach(() => {
    websocket = null;
  });

  it("when given time command then returns 08:00", () => {
    expect(websocket._getResponse(COMMAND1)).toBe(RESPONSE1);
  });
});
