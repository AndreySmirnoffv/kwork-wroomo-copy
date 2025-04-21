import { PaymentModel } from '../models/payment.model.js';
import { User } from '../models/user.model.js';
import { stripe } from '../services/payment.service.js';
import { sendToQueue } from '../utils/rabbitmq.js';
import { StatusCodes } from 'http-status-codes';
const paymentModel = new PaymentModel();
export async function createPayment(req, res) {
    const { amount, receipt_email } = req.body;
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "THB",
            automatic_payment_methods: {
                enabled: true
            },
            receipt_email
        });
        await paymentModel.createPayment(payment);
        console.log(payment);
    }
    catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
    }
}
export async function updateStripeCheckoutSession(req, res) {
    const { paymentId, receipt_email } = req.body;
    const payment = await stripe.paymentIntents.update(paymentId, {
        receipt_email
    });
    console.info(payment);
    return res.json(payment);
}
export async function updatePaymentStatus(req, res) {
    const { email, amount, paymentId, status, productId } = req.body;
    const user = await new User().findUser(email);
    const newBalance = (user === null || user === void 0 ? void 0 : user.balance) + amount;
    const payment = await paymentModel.updatePaymentStatus(paymentId, status, newBalance, email, productId);
    await sendToQueue("order_notifications", {
        type: "NEW_ORDER",
        data: "New order"
    });
    return res.json({ message: "Message was sent successfully", payment });
}
//# sourceMappingURL=payment.controller.js.map