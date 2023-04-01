import { DatabaseError, QueryResult } from 'pg'
import { pool } from '../DB/pool.js'

export const make_request_to_db = async (query_string: string, params?: any[]): Promise<QueryResult> => {
    const client = await pool.connect()
    try {
        return await client.query(query_string, params)
    } finally {
        client.release()
    }
}
