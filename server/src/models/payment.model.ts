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

    async updatePaymentStatus(paymentId: string, status: string, balance: number, email: string, productId: bigint){
        return await prisma.$transaction([
            prisma.payment.update({
                where: { paymentId },
                data: {
                    status
                }
            }),

            prisma.user.update({
                where: { email },
                data: { balance }
            }),

            prisma.product.update({
                where: { id: productId }, 
                data: { isAvailable: false }
            })
        
        ])
       
    }
}