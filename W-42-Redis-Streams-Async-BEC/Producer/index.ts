import { createClient } from "redis";


async function main() {
  const client = await createClient()
    .on("error", (err) => console.error("Redis client error:", err))
    .connect()

  const res = await client.xAdd("betteruptime:website", "*", {
    url: "https://google.com",
    id: "1"
  })

  console.log(res)
  client.destroy() // destroying the process
}

main()