import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {

  const data = await prisma.user.findMany();
  console.log(data);

  res.json({
    msg: 'Hello World',
    data
  })
});

app.post("/", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: Math.random().toString(36).substring(2, 15) + '@example.com',
      password: Math.random().toString(36).substring(2, 15),
    }
  });
  res.json({
    msg: 'User created',
    user
  })
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});