import { getRabbitChannel } from "../services/rabbitmq.service.js";
export async function sendToQueue(queueName, message) {
    const channel = getRabbitChannel();
    const buffer = Buffer.from(JSON.stringify(message));
    channel.sendToQueue(queueName, buffer, { persistent: true });
}
//# sourceMappingURL=rabbitmq.js.map