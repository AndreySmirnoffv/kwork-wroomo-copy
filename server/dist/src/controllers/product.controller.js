import { ProductModel } from '../models/product.model.js';
import { insertToElasticSearch, searchProducts } from '../utils/elastic.search.js';
import { StatusCodes } from 'http-status-codes';
const productModel = new ProductModel();
export async function getProducts(req, res) {
    try {
        const results = await searchProducts(req.query);
        return res.json(results);
    }
    catch (error) {
        console.error(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Search failed",
        });
    }
}
export async function createProduct(req, res) {
    const productReq = req.body;
    const product = await productModel.createProduct(productReq);
    await insertToElasticSearch(product);
    return res.status(StatusCodes.CREATED).json({
        message: "Product was successfully created",
        product,
    });
}
export async function changeProduct(req, res) {
    const { id } = req.params;
    const updateData = req.body;
    const changedProduct = await productModel.changeProduct({
        id: BigInt(id),
        ...updateData,
    });
    return res.json({
        message: "Product was successfully updated",
        changedProduct,
    });
}
export async function deleteProduct(req, res) {
    const { id } = req.params;
    await productModel.deleteProduct(BigInt(id));
    return res.json({
        message: "Product was successfully deleted",
    });
}
//# sourceMappingURL=product.controller.js.map