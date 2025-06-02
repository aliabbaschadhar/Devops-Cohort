import { Hono } from 'hono'

const app = new Hono()

app.post("/api/v1/signup", async (c) => {

  const body = await c.req.json();
  console.log(body);
  console.log(c.req.header("Authorization"));
  console.log(c.req.query("userId"))

  return c.json({
    message: "User is shaka"
  })

})


app.post("/api/v1/signin", (c) => {
  return c.json({
    message: "User is shaka"
  })
})

app.post("/api/v1/todo", (c) => {
  return c.json({
    message: "User is shaka"
  })
})

app.get("/api/v1/todo", (c) => {
  return c.json({
    message: "User is shaka"
  })
})

export default app;
