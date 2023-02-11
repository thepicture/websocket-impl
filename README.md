# websocket-impl

A textual websocket

## Install

1. `git clone https://github.com/thepicture/websocket-impl`

2. `cd websocket-impl`

3. `npm i`

4. `npm run test`

## Usage

1. `npm start -- time 08:00 ping pong`

Then in any websocket streamer:

2. `websocat ws://127.0.0.1:8080`

- `time` streams `08:00`

- `ping` streams `pong`
