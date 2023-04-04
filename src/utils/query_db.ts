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

export const query_transaction_create_user = async (
    name: string,
    surname: string,
    email: string,
    password: string,
    role_id: number,
): Promise<QueryResult> => {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')

        const passId = await client.query('INSERT INTO passwords (password) VALUES($1) RETURNING id', [password])
        const insertPassIdValue = passId.rows[0].id

        const userResult = await client.query(
            'INSERT INTO users (name, surname, email, role_id, password_id) VALUES ($1, $2, $3, $4, $5) RETURNING id',
            [name, surname, email, role_id, insertPassIdValue],
        )

        await client.query('COMMIT')
        return userResult
    } catch (e) {
        await client.query('ROLLBACK')
        throw e
    } finally {
        client.release()
    }
}
