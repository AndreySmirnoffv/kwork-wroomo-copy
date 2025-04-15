import { PaymentModel } from '#src/models/payment.model.js'
import { User } from '#src/models/user.model.js'
import { stripe } from '#src/services/payment.service.js'
import { sendToQueue } from '#src/utils/rabbitmq.js'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

const paymentModel = new PaymentModel()

export async function createPayment(req: Request, res: Response): Promise<Response | any> {
    const { amount, receipt_email } = req.body

    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "THB",
            automatic_payment_methods: {
                enabled: true
            },
            receipt_email
        })

        await paymentModel.createPayment(payment)
    
        console.log(payment)
    } catch (error) {
        console.error(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" })
    }
   
}

export async function updateStripeCheckoutSession(req: Request, res: Response): Promise<Response | any>{
    const { paymentId, receipt_email } = req.body

    const payment = await stripe.paymentIntents.update(paymentId, {
        receipt_email
    })

    console.info(payment)
    return res.json(payment)

}

export async function updatePaymentStatus(req: Request, res: Response): Promise<Response | any> {
    const { email, amount, paymentId, status } = req.body

    const user = await new User().findUser(email)
    
    const newBalance = user?.balance + amount

    const payment = await paymentModel.updatePaymentStatus(paymentId, status, newBalance, email)

    await sendToQueue("order_notifications", {
        type: "NEW_ORDER",
        data: "New order"
    })

    return res.json({ message: "Message was sent successfully", payment })
}