import { getAdmin } from '../controllers/admin.controller.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';
import { router } from './router.js';
router.get("/:uuid", adminMiddleware, getAdmin);
export default router;
//# sourceMappingURL=admin.routes.js.map