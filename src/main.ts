import express from 'express'
import dotenv from 'dotenv'
import middleware from './middlewares/middleware.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000
app.use(middleware)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
