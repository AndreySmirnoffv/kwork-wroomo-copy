import { prisma } from "../services/prisma.service.js";
export class ManagerModel {
    async manageProduct(id, isApproved) {
        return await prisma.product.update({
            where: { id },
            data: { isApproved }
        });
    }
}
//# sourceMappingURL=manager.model.js.map