import { prisma } from "#src/services/prisma.service.js"

export class ManagerModel{
    async manageProduct(id: bigint, isApproved: boolean){
        return await prisma.product.update({
            where: { id },
            data: { isApproved }
        })
    }
}