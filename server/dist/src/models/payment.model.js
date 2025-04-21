import { prisma } from "../services/prisma.service.js";
export class PaymentModel {
    async createPayment(data) {
        const { paymentId, value, email, status } = data;
        return prisma.payment.create({
            data: {
                paymentId,
                email,
                value,
                status
            }
        });
    }
    async updatePaymentStatus(paymentId, status, balance, email, productId) {
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
        ]);
    }
}
//# sourceMappingURL=payment.model.js.map