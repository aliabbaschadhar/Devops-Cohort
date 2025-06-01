import { NextFunction, Request, Response } from "express";
import client from "prom-client";

// Create a counter metric
export const requestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
});

export const totalRequestCounter = new client.Counter({
    name: "http_request_all_total",
    help: "Total number of all requests at HTTP requests"
})

// Total number of request middleware

export function countRequestsMiddleware(req: Request, res: Response, next: NextFunction) {

    if (req.path === '/metrics') { // don't include the metrics endpoint in the count
        return next()

    }

    res.on("finish", () => {
        requestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode

        })
        totalRequestCounter.inc();
    })

    next()

}