import { ManagerModel } from "../models/manager.model.js";
const managerModel = new ManagerModel();
export async function approveProduct(req, res) {
    const { id, isApproved } = req.body;
    await managerModel.manageProduct(id, isApproved);
    return res.json({ message: `you successfully set ${isApproved} status for the product ${id}` });
}
//# sourceMappingURL=manager.controller.js.map