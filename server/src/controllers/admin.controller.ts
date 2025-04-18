import { AdminModel } from '#src/models/admin.model.js'
import { User } from '#src/models/user.model.js'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

const userModel = new User()
const admiModel = new AdminModel()

export async function getAdmin(req: Request, res: Response): Promise<Response | any>{
    const { uuid } = req.params

    const admin = await userModel.findUserByUuid(uuid)

    return res.json({ message: "access granted", admin })
}

export async function changeUserRole(req: Request, res: Response): Promise<Response | any>{
    const { uuid, role } = req.body

    const user = await userModel.findUserByUuid(uuid)

    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" })
    }

    await admiModel.changeUserRole(user.email, role)

    return res.json({ message: `Role ${role} was succesfully set for the user` })
}

