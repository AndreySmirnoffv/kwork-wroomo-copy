import amqplib from 'amqplib';
let channel = null;
export async function initRabbitMQ() {
    const connection = await amqplib.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue("push_notifications", { durable: true });
}
export function getRabbitChannel() {
    if (!channel) {
        throw new Error("RabbitMQ channel is not initialized");
    }
    return channel;
}
//# sourceMappingURL=rabbitmq.service.js.map