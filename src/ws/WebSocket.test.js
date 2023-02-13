const { WebSocket } = require("./WebSocket");

const COMMAND1 = "time";
const RESPONSE1 = "08:00";

const COMMAND2 = "echo $((42))";
const RESPONSE2 = "42";

const COMMAND3 = "#".repeat(125);
const RESPONSE3 = "125";

const COMMAND4 = "#".repeat(126);
const RESPONSE4 = "126";

const COMMAND5 = "#".repeat(127);
const RESPONSE5 = "127";

describe("WebSocket", () => {
  let websocket;

  beforeEach(() => {
    websocket = new WebSocket();

    websocket.addCommand(COMMAND1, RESPONSE1);
    websocket.addCommand(COMMAND2, RESPONSE2);
    websocket.addCommand(COMMAND3, RESPONSE3);
    websocket.addCommand(COMMAND4, RESPONSE4);
    websocket.addCommand(COMMAND5, RESPONSE5);
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

    const actual = await websocket._getResponse(COMMAND2);

    expect(actual).toBe(expected);
  });

  it("when length is 125 then returns 125", async () => {
    const expected = RESPONSE3;

    const actual = await websocket._getResponse(COMMAND3);

    expect(actual).toBe(expected);
  });

  it("when length is 126 then returns 126", async () => {
    const expected = RESPONSE4;

    const actual = await websocket._getResponse(COMMAND4);

    expect(actual).toBe(expected);
  });

  it("when length is 127 then returns 127", async () => {
    const expected = RESPONSE5;

    const actual = await websocket._getResponse(COMMAND5);

    expect(actual).toBe(expected);
  });
});
