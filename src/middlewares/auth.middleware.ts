import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { User } from '#src/models/user.model.js';

dotenv.config()

const user = new User()

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<any> {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Ошибка авторизации: Токен не был передан либо недействителен" });
    }
    const token = authHeader.split(" ")[1].replace(/^"|"$/g, "");

    if (!token || typeof token !== "string") {
        return res.status(403).json({ message: "Неверный формат" });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET as string);
        const tokenUser = await user.findUserByToken(token)
        res.json(tokenUser)
        next()
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            res.redirect(String(process.env.FRONTEND_API + "/auth"))
            return res.status(403).json({ message: "Токен истек" });
        }
        console.log(error)
        return res.status(403).json({ message: "Неправельный токен" });
    }
}