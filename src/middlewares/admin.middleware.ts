import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export async function adminMiddleware(req: Request, res: Response, next: NextFunction): Promise<NextFunction | Response | any> {
    const adminHeader = req.headers.authorization;

    if (!adminHeader) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Ошибка авторизации: Не смог подтвердить статус" });
    }

    const status = adminHeader.split(" ")[1]?.replace(/^"|"$/g, "");

    if (!status || typeof status !== "string") {
        return res.status(StatusCodes.FORBIDDEN).json({ message: "У пользователя нету прав доступа" });
    }

    try {
        if (status !== "admin") {
            return res.status(StatusCodes.FORBIDDEN).json({ message: "Доступ запрещён: недостаточно прав" });
        }

        next();
    } catch (error) {
        console.error("Ошибка в adminMiddleware:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Внутренняя ошибка сервера" });
    }
}
