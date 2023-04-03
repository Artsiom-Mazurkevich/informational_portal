import { Router } from 'express'
import { authController } from '../controllers/authController.js'
import { body } from 'express-validator'

const router = Router()

router.post(
    '/register',
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 30 }),
    authController.register,
)
router.post('/login', authController.login)
router.post('/me', authController.me)

export default router
