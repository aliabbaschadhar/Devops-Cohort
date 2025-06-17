require("dotenv").config({
  file: "./secret/.env"
})

import express from "express"

const app = express();

console.log(process.env.DATABASE_URL)
console.log(process.env.PORT)

app.get("/", (req, res) => {
  res.json({
    db: process.env.DATABASE_URL,
    port: process.env.PORT,
    message: "Hello, World! This is a simple Express server."
  })
})

app.listen(process.env.PORT, () => {
  console.log("Server running on PORT:", process.env.PORT)
})