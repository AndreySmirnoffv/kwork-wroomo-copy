import { prisma } from "#src/services/prisma.service.js";

export class AdminModel{

    async changeUserRole(email: string, role: string){
        return await prisma.user.update({
            where: { email },
            data: { role }
        })
    }
}