import { type WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 })

interface Room {
  sockets: WebSocket[]
}

const rooms: Record<string, Room> = {
  // room1:{
  //   sockets:[ws1,ws2,ws3]
  // }
}

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data: string) {
    const parsedData = JSON.parse(data);
    if (parsedData.type == "join-room") {
      const room = parsedData.room;
      if (!rooms[room]) {
        rooms[room] = {
          sockets: []
        }
      }
      rooms[room].sockets.push(ws);
    }

    if (parsedData.type == "chat") {
      const room = parsedData.room
      rooms[room].sockets.map((socket) => socket.send(parsedData.message))
    }
  });

  ws.on("close", () => {
    console.log("Connection closed by:", ws)
  })
});

// const rooms: Map<string, WebSocket[]> = new Map<string, WebSocket[]>()
// wss.on("connection", (ws: WebSocket) => {
//   let currentRoom: string | null = null;

//   ws.on("message", (data: string) => {
//     try {
//       const msg = JSON.parse(data);
//       if (msg.type === "join" && typeof msg.room === "string") {
//         currentRoom = msg.room as string;
//         if (!rooms.has(currentRoom)) {
//           rooms.set(currentRoom, []);
//         }
//         rooms.get(currentRoom)!.push(ws);
//       } else if (msg.type === "message" && currentRoom) {
//         const clients = rooms.get(currentRoom) || [];
//         for (const client of clients) {
//           if (client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify({ type: "message", room: currentRoom, text: msg.text }));
//           }
//         }
//       }
//     } catch (e) {
//       // Ignore malformed messages
//     }
//   });

//   ws.on("close", () => {
//     if (currentRoom && rooms.has(currentRoom)) {
//       const clients = rooms.get(currentRoom)!;
//       rooms.set(currentRoom, clients.filter(client => client !== ws));
//     }
//   });
// });