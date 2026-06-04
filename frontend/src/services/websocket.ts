let socket: WebSocket


export const connectSocket = () => {

  socket = new WebSocket('ws://127.0.0.1:8000/ws')

  return socket
}