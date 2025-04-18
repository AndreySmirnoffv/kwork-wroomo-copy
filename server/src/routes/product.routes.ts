import { changeProduct, createProduct, deleteProduct, getProducts } from '#src/controllers/product.controller.js'
import { router } from '#src/routes/router.js'

router.get("/products", getProducts)
router.post("/products", createProduct)
router.put("/products/:id", changeProduct)
router.delete("/products/:id", deleteProduct)

export default router