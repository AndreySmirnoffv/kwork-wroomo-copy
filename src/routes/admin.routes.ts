import { admin } from '#src/controllers/admin.controller.js'
import { adminMiddleware } from '#src/middlewares/admin.middleware.js'
import { router } from './router.js'

router.get("/:username", adminMiddleware, admin)

export default router