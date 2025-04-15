import amqplib from 'amqplib'

let channel: amqplib.Channel | null = null


export const initRabbitMQ = async (): Promise<void> => {
    const connection = await amqplib.connect(process.env.RABBITMQ_URL as string)
    channel = await connection.createChannel()
    await channel.assertQueue("push_notifications", { durable: true })
}

export const getRabbitChannel = (): amqplib.Channel => {
    if (!channel) {
        throw new Error("RabbitMQ channel is not initialized")
    }
    return channel
}