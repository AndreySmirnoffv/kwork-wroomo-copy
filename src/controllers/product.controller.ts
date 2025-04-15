import { ProductModel } from '#src/models/product.model.js'
import { TypeProduct } from '#src/types/Product.js'
import { insertToElasticSearch, searchProducts } from '#src/utils/elastic.search.js'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

const productModel = new ProductModel()

export async function getProducts(req: Request, res: Response): Promise<Response | any> {
    try {
        const results = await searchProducts(req.query)
        return res.json(results)
    } catch (error) {
        console.error(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Search failed",
        })
    }
}

export async function createProduct(req: Request, res: Response): Promise<Response | any> {
    const productReq = req.body

    const product: TypeProduct = await productModel.createProduct(productReq)

    await insertToElasticSearch(product)

    return res.status(StatusCodes.CREATED).json({
        message: "Product was successfully created",
        product,
    })
}


export async function changeProduct(req: Request, res: Response): Promise<Response | any> {
    const { id } = req.params
    const updateData = req.body

    const changedProduct = await productModel.changeProduct({
        id: BigInt(id),
        ...updateData,
    })

    return res.json({
        message: "Product was successfully updated",
        changedProduct,
    })
}

export async function deleteProduct(req: Request, res: Response): Promise<Response | any> {
    const { id } = req.params

    await productModel.deleteProduct(BigInt(id))

    return res.json({
        message: "Product was successfully deleted",
    })
}
