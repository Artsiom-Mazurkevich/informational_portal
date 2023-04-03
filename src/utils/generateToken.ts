import jwt from 'jsonwebtoken'

export const generateToken = (userId: number) => {
    const token = jwt.sign({ id: userId }, 'mysecretkey', { expiresIn: '1d' })
    return token
}
