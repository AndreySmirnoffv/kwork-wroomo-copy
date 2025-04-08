import { register, login } from "#src/controllers/auth.controller.js";
import { authMiddleware } from "#src/middlewares/auth.middleware.js";
import { router } from "#src/routes/router.js"

router.post("/register", register)
router.post("/login", authMiddleware, login)

export default router