import { AdminModel } from '../models/admin.model.js';
import { User } from '../models/user.model.js';
import { StatusCodes } from 'http-status-codes';
const userModel = new User();
const adminModel = new AdminModel();
export async function getAdmin(req, res) {
    const { uuid } = req.params;
    const admin = await userModel.findUserByUuid(uuid);
    return res.json({ message: "access granted", admin });
}
export async function changeUserRole(req, res) {
    const { uuid, role } = req.body;
    const user = await userModel.findUserByUuid(uuid);
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: "User not found" });
    }
    await adminModel.changeUserRole(user.email, role);
    return res.json({ message: `Role ${role} was succesfully set for the user` });
}
//# sourceMappingURL=admin.controller.js.map