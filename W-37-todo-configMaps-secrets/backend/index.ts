import express from "express"

const app = express();

console.log(process.env.DATABASE_URL)

app.listen(process.env.PORT)