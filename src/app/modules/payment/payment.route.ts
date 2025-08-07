import { Router } from "express"
import { PaymentController } from "./payment.controller"




const router = Router()




router.post('/init-payment/:bookingId', PaymentController.initPayment)
router.post('/success', PaymentController.successPayment)
router.post('/fail', PaymentController.failPayment)
router.post('/cancel', PaymentController.cancelPayment)
// router.post('/fail', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), userController.getAllUsers)
// router.post('/cancel', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), userController.getAllUsers)

export const PaymentRoutes = router