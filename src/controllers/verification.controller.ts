import { User } from "#src/models/User.model.js";
import { transport } from "#src/services/transport.service.js";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

const user = new User();

export async function sendEmail(to: string, token: string) {
    return transport.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: "Подтверждение почты",
        //TODO: На проде вместо localhost:8000 подставить домен
        html: `<a href="http://localhost:8000/api/verification/verify-email?token=${token}">Подтвердить почту</a>`
    });
}

export async function verifyEmail(req: Request, res: Response): Promise<Response | any> {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ message: "Токен не найден" });
    }

    try {
        const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string);
        const { email } = decoded as { email: string };

        const userExists = await user.findUser(email);

        if (!userExists) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Пользователь не найден" });
        }

        const data = {
            email,
            is_email_verified: true,
            token
        }
        
        await user.emailStatus(data);

        return res.json({ message: "Email подтвержден!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Ошибка при подтверждении почты" });
    }
}
