import { User } from '#src/models/User.model.js'
import { TypeUser } from '#src/types/User.js'
import { comparePasswords, hashPassword } from '#src/utils/bcrypt.js'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { sendEmail } from './verification.controller.js'

const user = new User()

export async function register(req: Request, res: Response): Promise<Response | any>{
    const { email, password } = req.body
    
    const userExists = await user.findUser(email)

    if(userExists){
        return res.status(StatusCodes.CONFLICT).json({message: "Пользователь существует"})
    }

    const hashedPassword = await hashPassword(password);

    const token = jwt.sign(
        { email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    );

    console.log(token)

    const data: TypeUser = {
        email,
        password: hashedPassword,
        emailVerified: false,
        token
    };
    
    const createdUser = await user.createUser(data);
    
    const { password: _password, ...userInfo } = createdUser; 

    await sendEmail(email, token);

    return res.status(StatusCodes.CREATED).json({
        message: "Пользователь создан",
        user: userInfo
    });
}


export async function login(req: Request, res: Response): Promise<Response | any> {
    const { email, password } = req.body;

    const userExists = await user.findUser(email);

    if (!userExists) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "Пользователь не найден" });
    }

    if (!userExists.is_email_verified) {
        return res.status(401).json({ message: "Подтвердите почту" });
    }

    const isPasswordValid = await comparePasswords(password, userExists.password);
    
    if (!isPasswordValid) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Неверный пароль" });
    }

    const token = jwt.sign(
        { email: userExists.email, userId: userExists.id },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    );

    const { password: _password, ...userInfo } = userExists;

    return res.json({
        message: "Авторизация прошла успешно",
        token: token,
        userInfo
    });
}

