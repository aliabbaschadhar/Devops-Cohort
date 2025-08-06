import { beforeAll, describe, expect, test } from "bun:test"
import WebSocket, { type MessageEvent } from "ws"

const BACKEND_URL1 = "ws://localhost:8080"
const BACKEND_URL2 = "ws://localhost:8081"

describe('Chat application ', () => {

  test("Message send from room 1 reaches another participant in room 1 ", async () => {


    const ws1 = new WebSocket(BACKEND_URL1)
    const ws2 = new WebSocket(BACKEND_URL2)

    // Make sure sockets are connected first then ws.send wil start working for that i think we would use promise.all()

    // Ugly way of doing that 
    // await new Promise<void>((resolve, reject) => {
    //   let count = 0
    //   ws1.onopen = () => {
    //     console.log("Ws1 connected")
    //     count++
    //     if (count == 2) {
    //       resolve()
    //     }
    //   }
    //   ws2.onopen = () => {
    //     console.log("Ws2 connected")
    //     count++
    //     if (count == 2) {
    //       resolve()
    //     }
    //   }
    // })

    // Great way of doing that using Promise.all()

    await Promise.all(
      [
        new Promise<void>((resolve) => ws1.onopen = () => {
          console.log("Ws1 connected")
          resolve()
        })
        ,
        new Promise<void>((resolve) => ws2.onopen = () => {
          console.log("Ws2 connected")
          resolve()
        })
      ]
    )

    // Now send the message

    console.log("WS1 and WS2 both are connected!")

    ws1.send(JSON.stringify({
      type: "join-room",
      room: "Room 1"
    }))

    ws2.send(JSON.stringify({
      type: "join-room",
      room: "Room 1"
    }))

    // Promise will only be resolved if both servers receive the message
    await new Promise<void>(resolve => {

      ws2.onmessage = ({ data }) => {
        console.log(data)
        const parsedData = JSON.parse(data.toString())
        expect(parsedData.type === "chat")
        expect(parsedData.message === "hi there shaka g")
        resolve();
      };

      ws1.send(JSON.stringify({
        type: "chat",
        room: "Room 1",
        message: "hi there shaka g"
      }));

    })

  })
})