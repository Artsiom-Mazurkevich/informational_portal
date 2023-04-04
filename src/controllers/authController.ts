import { Request, Response } from 'express'
import { make_request_to_db, query_transaction_create_user } from '../utils/query_db.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/generateToken.js'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { validationResult } from 'express-validator'

class AuthController {
    async register(req: Request, res: Response) {
        const { name, surname, email, password, role_id } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Validation error' })
        }

        if (!name || !surname || !email || !password || !role_id) {
            return res.status(400).json({ message: 'Please enter all fields' })
        }

        try {
            // Проверяем, есть ли пользователь с таким email
            const result = await make_request_to_db('SELECT * FROM users WHERE email = $1', [email])
            if (result.rows.length > 0) {
                return res.status(400).json({ message: 'User already exists' })
            }

            // Хешируем пароль и сохраняем пользователя в БД
            const salt = await bcrypt.genSalt(7)
            const hashedPassword = await bcrypt.hash(password, salt)

            const newUser = await query_transaction_create_user(name, surname, email, hashedPassword, role_id)
            console.log('NewUser: ', newUser)

            const token = generateToken(newUser.rows[0].id)

            res.status(201).json({ token })
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: 'Server error' })
        }
    }
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            // Получаем информацию о пользователе из БД
            // const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
            const result = await make_request_to_db('SELECT * FROM users WHERE email = $1', [email])

            if (result.rows.length === 0) {
                return res.status(400).json({ message: 'Invalid credentials' })
            }

            const user = result.rows[0]

            // Проверяем пароль
            const isPasswordValid = await bcrypt.compare(password, user.password)

            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid credentials' })
            }

            // Генерируем токен
            const token = generateToken(user.id)

            res.status(200).json({ token })
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: 'Server error' })
        }
    }
    async me(req: Request, res: Response) {
        try {
            // Получаем id пользователя из токена
            const token = req.header('Authorization')?.replace('Bearer ', '')
            let userId = null
            if (token) {
                const decoded = jwt.verify(token, 'mysecretkey') as JwtPayload
                userId = decoded.id
            }
            // const decoded = jwt.verify(token, 'mysecretkey')
            // const userId = decoded.id

            // Получаем информацию о пользователе из БД
            // const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId])
            const result = await make_request_to_db('SELECT * FROM users WHERE id = $1', [userId])

            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'User not found' })
            }

            const { id, name, surname, email, role } = result.rows[0]
            // ❌❌❌❌❌❌❌❌❌ role
            res.status(200).json({ id, name, surname, email, role })
        } catch (err) {
            console.error(err)
            res.status(500).json({ message: 'Server error' })
        }
    }
}

export const authController = new AuthController()
