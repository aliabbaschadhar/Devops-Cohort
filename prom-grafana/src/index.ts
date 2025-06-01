import express from "express";
import { middleware } from "./middleware";
import client from "prom-client";
import { metricsMiddleware } from "./metrics";
import { countRequestsMiddleware } from "./metrics/requestCount";

const app = express();

app.use(express.json());
app.use(middleware);
app.use(metricsMiddleware);
app.use(countRequestsMiddleware);

app.get("/user", async (req, res) => {

    await new Promise((resolve) => setTimeout(resolve, Math.random() * 2500));
    res.send({
        name: "John Doe",
        age: 25,
    });
});

app.post("/user", (req, res) => {
    const user = req.body;
    res.send({
        ...user,
        id: 1,
    });
});

app.get("/metrics", async (req, res) => {
    const metrics = await client.register.metrics();
    res.set('Content-Type', client.register.contentType);
    res.end(metrics);
})

app.listen(3000);