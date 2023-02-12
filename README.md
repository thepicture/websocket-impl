# websocket-impl

A textual websocket with shell command execution support

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

### Command execution

A simple counter that initializes and then increments a number in counter repository with respect to the executing folder

1. `npm start -- init 'echo $(mkdir counter && touch counter/0 && echo "created")' increment 'echo $(ls -Art counter | tail -1 | xargs -I _ echo "_+1" | bc | xargs -I _ touch counter/_ && ls -Art counter | tail -1 | xargs echo)'`

2. `init` prints `created`

- `increment` prints `1`

- `increment` prints `2` ...
