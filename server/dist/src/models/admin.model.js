import { prisma } from "../services/prisma.service.js";
export class AdminModel {
    async changeUserRole(email, role) {
        return await prisma.user.update({
            where: { email },
            data: { role }
        });
    }
}
//# sourceMappingURL=admin.model.js.map