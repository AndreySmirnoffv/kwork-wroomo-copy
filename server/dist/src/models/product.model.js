import { prisma } from "../services/prisma.service.js";
export class ProductModel {
    async createProduct(productData) {
        return await prisma.product.create({
            data: productData
        });
    }
    async changeProduct(productData) {
        return await prisma.product.update({
            where: { id: productData.id },
            data: productData
        });
    }
    async deleteProduct(id) {
        return await prisma.product.delete({
            where: { id }
        });
    }
}
//# sourceMappingURL=product.model.js.map