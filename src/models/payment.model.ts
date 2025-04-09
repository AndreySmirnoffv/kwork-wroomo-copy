import { prisma } from "#src/services/prisma.service.js";
import { PaymentType } from "#src/types/Payment.js";

export class PaymentModel{
    async createPayment(data: any){
        const { paymentId, value, email, status } = data

        return prisma.payment.create({
            data: {
                paymentId,
                email,
                value,
                status
            }
        })
    }

    async updatePaymentStatus(paymentId: string, status: string){
        return prisma.payment.update({
            where: { paymentId },
            data: {
                status
            }
        })
    }
}