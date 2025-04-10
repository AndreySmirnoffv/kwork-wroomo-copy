import { User } from "#src/models/user.model.js";
import { Request, RequestParamHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

const userModel = new User()

export async function getUser(req: Request, res: Response): Promise<Response | any> {
    const { uuid } = req.params;

    const user = await userModel.findUserByUuid(uuid);

    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    }

    return res.json(user);
}

export async function replaceUser(req: Request, res: Response): Promise<Response | any> {
    const { uuid } = req.params;
    const userData = req.body;

    if (!userData.email) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Email is required" });
    }

    const existingUser = await userModel.findUserByUuid(uuid);

    if (!existingUser) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    }

    if (userData.avatar) {
        try {
            const avatarUrl = await userModel.updateUser(uuid, userData.avatar);
            userData.avatar_url = avatarUrl;
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error uploading avatar" });
        }
    }

    const updatedUser = await new User().updateUser(uuid, userData);

    return res.json({ message: "User replaced successfully", user: updatedUser });
}

export async function updateUser(req: Request, res: Response): Promise<Response | any> {
    const { uuid } = req.params;
    const updates = req.body;

    if (!Object.keys(updates).length) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "No fields to update" });
    }

    const user = await new User().findUserByUuid(uuid);

    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    }

    if (req.body.avatar) {
        try {
            const avatarUrl = await userModel.updateUser(uuid, req.body.avatar);
            updates.avatar_url = avatarUrl;
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error uploading avatar" });
        }
    }

    const updatedUser = await new User().updateUser(uuid, updates);

    return res.json({ message: "User updated successfully", user: updatedUser });
}

export async function deleteUser(req: Request, res: Response): Promise<Response | any> {
    const { uuid } = req.params;

    const user = await userModel.findUserByUuid(uuid);

    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    }

    await userModel.deleteUser(uuid);

    return res.status(StatusCodes.OK).json({ message: "User deleted successfully" });
}
