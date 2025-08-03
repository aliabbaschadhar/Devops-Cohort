import { createClient } from "redis";

async function main() {
  const client = await createClient()
    .on("error", (err) => console.error("Error while connection with redis: ", err))
    .connect()

  // const cGroup = await client.xGroupCreate("betteruptime:website", 'PK', "$")

  // console.log(cGroup)

  const res = await client.xReadGroup("PK", "pk-1", {
    key: "betteruptime:website",
    id: ">" // Read the entries which are not red by the INDIA consumer group
  }, {
    COUNT: 2
  }) as { name: string; messages: { id: string; message: { [x: string]: string; }; }[]; }[] | null;

  // console.log(typeof (res))
  if (res && Array.isArray(res) && res.length > 0) {
    console.log(res[0].messages)
  } else {
    console.log("No messages found");
  }
  client.destroy()
}

main()