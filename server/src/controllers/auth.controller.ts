import { User } from '#src/models/user.model.js'
import { TypeUser } from '#src/types/User.js'
import { comparePasswords, hashPassword } from '#src/utils/bcrypt.js'
import { Request, Response } from 'express'
import { sendEmail } from './verification.controller.js'
import { generateAccessToken, generateRefreshToken } from '#src/utils/jwt.js';
import { StatusCodes } from 'http-status-codes'
import dayjs from 'dayjs'

const user = new User()

export async function register(req: Request, res: Response): Promise<Response | any> {
    const { name, surname, email, password, birthDate } = req.body;

    const userExists = await user.findUser(email);
    
    if (userExists) return res.status(StatusCodes.CONFLICT).json({ message: "User already exists" });

    const hashedPassword = await hashPassword(password);
    const tokenPayload = { email };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    const data: TypeUser = {
        email,
        password: hashedPassword,
        name,
        surname,
        emailVerified: false,
        accessToken,
        refreshToken,
        birthDate
    };

    const createdUser = await user.createUser(data);

    const { password: _, refreshToken: __, ...userInfo } = createdUser;

    await sendEmail(email, accessToken);

    res.cookie("refreshToken", refreshToken, {
        secure: true,
        httpOnly: true,
        expires: dayjs().add(30, "days").toDate()
    });

    res.cookie("accessToken", accessToken, {
        secure: true,
        httpOnly: false,
        expires: dayjs().add(15, 'minute').toDate()
    });
    

    return res.status(StatusCodes.CREATED).json({
        message: "User created",
        user: userInfo,
    });
}


export async function login(req: Request, res: Response): Promise<Response | any> {
    const { login, password } = req.body;
    
    const userExists = await user.findUser(login);

    if (!userExists) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    }

    if (!userExists.is_email_verified) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Please verify your email" });
    }

    const isPasswordValid = await comparePasswords(password, userExists.password);
    
    if (!isPasswordValid) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid password" });
    }

    const tokenPayload = { login: userExists.email, userId: userExists.uuid };
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
        message: "Login successful",
        user: userInfo
    });
}
