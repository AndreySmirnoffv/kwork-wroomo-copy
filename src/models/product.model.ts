import { prisma } from "#src/services/prisma.service.js";
import { TypeProduct } from "#src/types/Product.js";

export class ProductModel{
    async createProduct(productData: TypeProduct){
        return await prisma.product.create({
            data: productData
            
        })
    }

    async changeProduct(productData: TypeProduct){
        return await prisma.product.update({
            where: { id: productData.id },
            data: productData
        })
    }

    async deleteProduct(id: bigint){
        return await prisma.product.delete({
            where: {id}
        })
    }
}