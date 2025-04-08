import { router } from "#src/routes/router.js";
import authRoutes from '#src/routes/auth.routes.js'
import verificationRoutes from '#src/routes/verification.routes.js'
import paymentRoutes from '#src/routes/payment.routes.js'
import * as swaggerUi from 'swagger-ui-express'
import openapi from './openapi.json' with { type: "json" }

router.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi))
router.use('/auth', authRoutes)
router.use("/verification", verificationRoutes)
router.use("/payments", paymentRoutes)

export default router