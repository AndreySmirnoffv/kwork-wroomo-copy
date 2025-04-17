import { router } from "#src/routes/router.js";
import authRoutes from '#src/routes/auth.routes.js'
import verificationRoutes from '#src/routes/verification.routes.js'
import paymentRoutes from '#src/routes/payment.routes.js'
import userRoutes from '#src/routes/user.routes.js'

router.use('/auth', authRoutes)
router.use("/verification", verificationRoutes)
router.use("/payments", paymentRoutes)
router.use("/users", userRoutes)

export default router