import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import middleware from './middlewares/middleware.js'

dotenv.config()

const app: express.Application = express()
const port = process.env.PORT || 5000
app.use(middleware)

app.get('/', async (req: Request, res: Response) => {
    res.send('Server work!')
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
