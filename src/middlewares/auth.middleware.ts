import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '#src/models/user.model.js';
import { generateAccessToken } from '#src/utils/jwt.js';
import { StatusCodes } from 'http-status-codes';

dotenv.config();

const user = new User();

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<any> {
    const authHeader = req.headers.authorization;
    const refreshToken = req.headers['x-refresh-token'] as string | undefined;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Access токен не был передан" });
    }

    const accessToken = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET as string);
        (req as any).user = decoded;
        return next();
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            if (!refreshToken) {
                return res.status(StatusCodes.FORBIDDEN).json({ message: "Access токен истёк. Refresh токен отсутствует." });
            }

            try {
                const decodedRefresh = jwt.verify(refreshToken, process.env.REFRESH_SECRET as string) as any;

                const existingUser = await user.findUser(decodedRefresh.email);
                if (!existingUser || existingUser.accessToken !== refreshToken) {
                    return res.status(StatusCodes.FORBIDDEN).json({ message: "Refresh токен недействителен" });
                }

                const newAccessToken = generateAccessToken({
                    email: existingUser.email,
                    userId: existingUser.uuid
                });

                res.setHeader("x-access-token", newAccessToken);

                (req as any).user = jwt.decode(newAccessToken);
                return next();

            } catch (refreshError) {
                return res.status(StatusCodes.FORBIDDEN).json({ message: "Неверный или просроченный refresh токен" });
            }
        }

        return res.status(StatusCodes.FORBIDDEN).json({ message: "Невалидный access токен" });
    }
}
