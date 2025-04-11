import { User } from '#src/models/user.model.js'
import { TypeUser } from '#src/types/User.js'
import { comparePasswords, hashPassword } from '#src/utils/bcrypt.js'
import { Request, Response } from 'express'
import { sendEmail } from './verification.controller.js'
import { generateAccessToken, generateRefreshToken } from '#src/utils/jwt.js';
import dayjs from 'dayjs'
import { StatusCodes } from 'http-status-codes'

const user = new User()

export async function register(req: Request, res: Response) {
    const { email, password } = req.body;

    const userExists = await user.findUser(email);
    
    if (userExists) return res.status(StatusCodes.CONFLICT).json({ message: "Пользователь существует" });

    const hashedPassword = await hashPassword(password);
    const tokenPayload = { email };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    const data: TypeUser = {
        email,
        password: hashedPassword,
        emailVerified: false,
        accessToken,
        refreshToken
    };

    const createdUser = await user.createUser(data);
    const { password: _, refreshToken: __, ...userInfo } = createdUser;

    await sendEmail(email, accessToken);

    res.cookie("refreshToken", refreshToken, {
        secure: true,
        httpOnly: true,
        expires: dayjs().add(30, "days").toDate()
    });

    return res.status(StatusCodes.CREATED).json({
        message: "Пользователь создан",
        user: userInfo,
    });
}


export async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    
    const userExists = await user.findUser(email);

    if (!userExists) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Пользователь не найден" });
    }

    if (!userExists.is_email_verified) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Подтвердите почту" });
    }

    const isPasswordValid = await comparePasswords(password, userExists.password);
    if (!isPasswordValid) return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Неверный пароль" });

    const tokenPayload = { email: userExists.email, userId: userExists.uuid };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    await user.updateUser(userExists.uuid, { accessToken, refreshToken });

    const { password: _, refreshToken: __, ...userInfo } = userExists;

    res.cookie("refreshToken", refreshToken, {
        secure: true,
        httpOnly: true,
        expires: dayjs().add(30, "days").toDate()
    });

    return res.json({
        message: "Авторизация успешна",
        user: userInfo
    });
}
