import { register, login } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { router } from "../routes/router.js";
router.post("/register", register);
router.post("/login", authMiddleware, login);
export default router;
//# sourceMappingURL=auth.routes.js.map