import express from 'express'
import dotenv from 'dotenv'
import appRoutes from './app.js'
import cors from 'cors'
import { initRabbitMQ } from '#src/services/rabbitmq.service.js'
import * as swaggerUi from 'swagger-ui-express'
import openapi from './openapi.json' with { type: "json" }

dotenv.config()

const app = express()

app.use(cors({
    origin: [process.env.DEPLOY_IP as string],
    credentials: true,               
    methods: ['GET', 'POST', "PUT", "PATCH", "DELETE", 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

app.use("/api", appRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi))

// initRabbitMQ()

console.log(`${process.env.prodStatus ? process.env.DEV_IP : process.env.PROD_IP}`)

app.listen(process.env.PORT, () => console.log(`server adress is ${process.env.prodStatus ? process.env.DEV_IP : process.env.PROD_IP}:${process.env.PORT}`))