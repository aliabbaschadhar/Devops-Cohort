import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/", (req: Request, res: Response) => {
  const { name } = req.body;
  res.send(`Hello ${name}!`);
}
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
}
);