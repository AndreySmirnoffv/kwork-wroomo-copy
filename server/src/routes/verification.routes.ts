import { verifyEmail } from '#src/controllers/verification.controller.js'
import { router } from './router.js'

router.get('/verify-email', verifyEmail)

export default router