import { createPayment, updateStripeCheckoutSession } from '../controllers/payment.controller.js';
import { router } from './router.js';
router.post("/create-payment", createPayment);
router.post("/update-payment", updateStripeCheckoutSession);
export default router;
//# sourceMappingURL=payment.routes.js.map