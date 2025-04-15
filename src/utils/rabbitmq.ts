import { getRabbitChannel } from "#src/services/rabbitmq.service.js";

export async function sendToQueue (queueName: string, message: object): Promise<void>{
    const channel = getRabbitChannel()
    const buffer = Buffer.from(JSON.stringify(message))
    channel.sendToQueue(queueName, buffer, { persistent: true })
}