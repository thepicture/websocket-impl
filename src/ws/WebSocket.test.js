const { WebSocket } = require("./WebSocket");

const COMMAND1 = "time";
const RESPONSE1 = "08:00";

const COMMAND2 = "echo $((42))";
const RESPONSE2 = "42";

describe("WebSocket", () => {
  let websocket;

  beforeEach(() => {
    websocket = new WebSocket();

    websocket.addCommand(COMMAND1, RESPONSE1);
    websocket.addCommand(COMMAND2, RESPONSE2);
  });

  afterEach(() => {
    websocket = null;
  });

  it("when given time command then returns 08:00", async () => {
    const expected = RESPONSE1;

    const actual = await websocket._getResponse(COMMAND1);

    expect(actual).toBe(expected);
  });

  it("when registered command is 'echo $((42))' then returns 42", async () => {
    const expected = RESPONSE2;

    const actual = (await websocket._getResponse(COMMAND2)).slice(0, -1);

    expect(actual).toBe(expected);
  });
});
