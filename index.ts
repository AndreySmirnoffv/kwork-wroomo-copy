import express from 'express'
import dotenv from 'dotenv'
import appRoutes from './app.js'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors({
    origin: "*",
    credentials: true
}))

app.use(express.json())

app.use("/api", appRoutes);

console.log(`${process.env.prodStatus ? process.env.DEV_IP : process.env.PROD_IP}`)

app.listen(process.env.PORT, () => console.log(`server adress is ${process.env.prodStatus ? process.env.DEV_IP : process.env.PROD_IP}:${process.env.PORT}`))