import jwt from 'jsonwebtoken';
export function generateAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
}
export function generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '7d' });
}
//# sourceMappingURL=jwt.js.map