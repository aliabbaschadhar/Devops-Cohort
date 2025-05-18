import { prisma } from "@repo/db/client";
import { json } from "stream/consumers";

export default async function Home() {
  const users = await prisma.user.findMany();
  return (
    <div >
      {JSON.stringify(users)}
    </div>
  )
}