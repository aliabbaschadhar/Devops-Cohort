import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 })

const servers: WebSocket[] = []

wss.on("connection", (ws: WebSocket) => {
  ws.on("error", (err) => console.log("Error", err))

  servers.push(ws)

  ws.on("message", (data: string) => {
    servers.map(ws => {
      ws.send(data)
    })
  })
})
