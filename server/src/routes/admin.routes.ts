import { getAdmin } from '#src/controllers/admin.controller.js'
import { adminMiddleware } from '#src/middlewares/admin.middleware.js'
import { router } from './router.js'

router.get("/:uuid", adminMiddleware, getAdmin)

export default router