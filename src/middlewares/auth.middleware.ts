import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { User } from '#src/models/User.model.js';

dotenv.config()

const user = new User()

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<any> {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authentication error: Missing or malformed token" });
    }
    const token = authHeader.split(" ")[1].replace(/^"|"$/g, "");

    if (!token || typeof token !== "string") {
        return res.status(403).json({ message: "Invalid token format" });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET as string);
        const tokenUser = await user.findUserByToken(token)
        res.json(tokenUser)
        next()
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            res.redirect(String(process.env.FRONTEND_API + "/auth"))
            return res.status(403).json({ message: "Token expired" });
        }
        console.log(error)
        return res.status(403).json({ message: "Invalid token" });
    }
}