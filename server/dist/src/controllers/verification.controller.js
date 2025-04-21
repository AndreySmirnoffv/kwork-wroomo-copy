import { User } from "../models/user.model.js";
import { transport } from "../services/transport.service.js";
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
const user = new User();
export async function sendEmail(to, token) {
    return transport.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject: "Email Confirmation",
        //TODO: In production, replace localhost:8000 with the domain
        html: `<a href="http://localhost:8000/api/verification/verify-email?token=${token}">Confirm your email</a>`
    });
}
export async function verifyEmail(req, res) {
    const accessToken = req.query.token;
    if (!accessToken) {
        return res.status(400).json({ message: "Token not found" });
    }
    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const { email } = decoded;
        const userExists = await user.findUser(email);
        if (!userExists) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
        }
        const data = {
            email,
            accessToken,
            is_email_verified: true,
        };
        await user.emailStatus(data);
        return res.json({ message: "Email confirmed!" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error while confirming email" });
    }
}
//# sourceMappingURL=verification.controller.js.map