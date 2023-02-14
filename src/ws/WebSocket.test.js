const W3CWebSocket = require("websocket").w3cwebsocket;

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

const COMMAND6 = "_".repeat(125);
const RESPONSE6 = "ok125";

const COMMAND7 = "_".repeat(126);
const RESPONSE7 = "ok126";

const COMMAND8 = "#".repeat(30002000);
const RESPONSE8 = "ok127";

const HOST = "127.0.0.1";
const PORT = 8080;

describe("WebSocket", () => {
  let websocket;

  let w3cWebsocket;

  beforeAll(async () => {
    websocket = new WebSocket();
    await websocket.open();

    websocket.addCommand(COMMAND1, RESPONSE1);
    websocket.addCommand(COMMAND2, RESPONSE2);
    websocket.addCommand(COMMAND3, RESPONSE3);
    websocket.addCommand(COMMAND4, RESPONSE4);
    websocket.addCommand(COMMAND5, RESPONSE5);

    websocket.addCommand(COMMAND6, RESPONSE6);
    websocket.addCommand(COMMAND7, RESPONSE7);
    websocket.addCommand(COMMAND8, RESPONSE8);
  });

  afterAll(async () => {
    try {
      await websocket.close();
    } catch {}
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

  it("when client sends a 125-length string then returns response", () => {
    const command = COMMAND6;
    const expected = RESPONSE6;

    w3cWebsocket = new W3CWebSocket(`ws://${HOST}:${PORT}`);

    return new Promise((resolve, reject) => {
      w3cWebsocket.onmessage = ({ data: actual }) => {
        try {
          expect(actual).toBe(expected);
          resolve();
        } catch (error) {
          reject(error);
        } finally {
          try {
            w3cWebsocket.close();
          } catch {}
        }
      };

      w3cWebsocket.onopen = () => w3cWebsocket.send(command);
      w3cWebsocket.onerror = (error) => {
        console.error(error);
        reject(error);
      };
    });
  });

  it("when client sends a 126-length string then returns response", async () => {
    const command = COMMAND7;
    const expected = RESPONSE7;

    w3cWebsocket = new W3CWebSocket(`ws://${HOST}:${PORT}`);

    return new Promise((resolve, reject) => {
      w3cWebsocket.onmessage = ({ data: actual }) => {
        try {
          expect(actual).toBe(expected);
          resolve();
        } catch (error) {
          reject(error);
        } finally {
          try {
            w3cWebsocket.close();
          } catch {}
        }
      };

      w3cWebsocket.onopen = () => w3cWebsocket.send(command);
      w3cWebsocket.onerror = (error) => {
        console.error(error);
        reject(error);
      };
    });
  });

  it("when client sends a 127-length string then returns response", async () => {
    const command = COMMAND8;
    const expected = RESPONSE8;

    w3cWebsocket = new W3CWebSocket(`ws://${HOST}:${PORT}`);

    return new Promise((resolve, reject) => {
      w3cWebsocket.onmessage = ({ data: actual }) => {
        try {
          expect(actual).toBe(expected);
          resolve();
        } catch (error) {
          reject(error);
        } finally {
          try {
            w3cWebsocket.close();
          } catch {}
        }
      };

      w3cWebsocket.onopen = () => w3cWebsocket.send(command);
      w3cWebsocket.onerror = (error) => {
        console.error(error);
        reject(error);
      };
    });
  });
});
