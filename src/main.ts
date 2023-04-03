import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import middleware from './middlewares/middleware.js'
import { make_request_to_db } from './utils/query_db.js'
import { QueryResult } from 'pg'

dotenv.config()

const app: express.Application = express()
const port = process.env.PORT || 5000
app.use(middleware)

app.get('/', async (req: Request, res: Response) => {
    try {
        const data: QueryResult = await make_request_to_db('SELECT * FROM test')
        res.send(data.rows)
    } catch (e) {
        console.log(e)
    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
