let socket: WebSocket

export const connectSocket = () => {
  const wsUrl =
    window.location.hostname === "localhost"
      ? "ws://localhost:8000/ws"
      : "wss://ai-travel-planner-84v3.onrender.com/ws"

  socket = new WebSocket(wsUrl)

  return socket
}