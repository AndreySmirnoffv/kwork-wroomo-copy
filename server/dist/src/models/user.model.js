import { prisma } from "../services/prisma.service.js";
export class User {
    async findUser(email) {
        return prisma.user.findFirst({ where: { email } });
    }
    async createUser(data) {
        const { email, password, accessToken, refreshToken } = data;
        return prisma.user.create({
            data: {
                email,
                password,
                is_email_verified: false,
                accessToken,
                refreshToken
            },
        });
    }
    async findUserByToken(accessToken) {
        return prisma.user.findFirst({ where: { accessToken } });
    }
    async emailStatus(data) {
        const { email, is_email_verified, accessToken } = data;
        return prisma.user.update({
            where: { email },
            data: { accessToken, is_email_verified },
        });
    }
    async findUserByUuid(uuid) {
        return prisma.user.findUnique({ where: { uuid } });
    }
    async updateUser(uuid, updates) {
        return prisma.user.update({
            where: { uuid },
            data: updates,
        });
    }
    async deleteUser(uuid) {
        return prisma.user.delete({
            where: { uuid },
        });
    }
}
//# sourceMappingURL=user.model.js.map