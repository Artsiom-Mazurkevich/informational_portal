import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const appMiddleware = express()

appMiddleware.use(bodyParser.json())
appMiddleware.use(bodyParser.urlencoded({ extended: true }))
appMiddleware.use(cors())

export default appMiddleware
