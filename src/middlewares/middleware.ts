import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import authRouter from '../routes/authRouter.js'

const appMiddleware = express()

appMiddleware.use(bodyParser.json())
appMiddleware.use(bodyParser.urlencoded({ extended: true }))
appMiddleware.use(cors())
appMiddleware.use('/api/auth', authRouter)

export default appMiddleware
