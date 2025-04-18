import { ManagerModel } from "#src/models/manager.model.js";
import { Request, Response } from "express";

const managerModel = new ManagerModel()

export async function approveProduct(req: Request, res: Response): Promise<Response | any>{
    const { id, isApproved } = req.body

    await managerModel.manageProduct(id, isApproved)

    return res.json({ message: `you successfully set ${isApproved} status for the product ${id}` })
}