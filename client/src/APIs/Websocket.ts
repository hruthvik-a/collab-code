import { w3cwebsocket as WebSocket } from 'websocket';

const socket = new WebSocket("ws://localhost:3050/mouse-ws")

export default socket