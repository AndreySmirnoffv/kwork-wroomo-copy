import { changeProduct, createProduct, deleteProduct, getProducts } from '../controllers/product.controller.js';
import { router } from '../routes/router.js';
router.get("/products", getProducts);
router.post("/products", createProduct);
router.put("/products/:id", changeProduct);
router.delete("/products/:id", deleteProduct);
export default router;
//# sourceMappingURL=product.routes.js.map