import jwt from 'jsonwebtoken';

export function generateAccessToken(payload: object) {
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '15m' });
}

export function generateRefreshToken(payload: object) {
    return jwt.sign(payload, process.env.REFRESH_SECRET as string, { expiresIn: '7d' });
}
