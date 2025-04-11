import { User } from "#src/models/user.model.js";
import { transport } from "#src/services/transport.service.js";
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { TypeEmailStatus } from "#src/types/EmailStatus.js";

const user = new User();

export async function sendEmail(to: string, token: string) {
    return transport.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: "Email Confirmation",
        //TODO: In production, replace localhost:8000 with the domain
        html: `<a href="http://localhost:8000/api/verification/verify-email?token=${token}">Confirm your email</a>`
    });
}

export async function verifyEmail(req: Request, res: Response): Promise<Response | any> {
    const accessToken = req.query.token as string

    if (!accessToken) {
        return res.status(400).json({ message: "Token not found" });
    }

    try {
        const decoded = jwt.verify(accessToken as string, process.env.JWT_SECRET as string);
        const { email } = decoded as { email: string };

        const userExists = await user.findUser(email);

        if (!userExists) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
        }

        const data: TypeEmailStatus = {
            email,
            accessToken,
            is_email_verified: true,
        }
        
        await user.emailStatus(data);

        return res.json({ message: "Email confirmed!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error while confirming email" });
    }
}
