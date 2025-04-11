import { TypeUser } from "#src/types/User.js";
import { prisma } from "#src/services/prisma.service.js";
import { TypeEmailStatus } from "#src/types/EmailStatus.js";

export class User {
    async findUser(email: string) {
        return prisma.user.findFirst({ where: { email } });
    }

    async createUser(data: TypeUser) {
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

    async findUserByToken(accessToken: string) {
        return prisma.user.findFirst({ where: { accessToken } });
    }

    async emailStatus(data: TypeEmailStatus) {
        const { email, is_email_verified, accessToken } = data;

        return prisma.user.update({
            where: { email },
            data: { accessToken, is_email_verified },
        });
    }

    async findUserByUuid(uuid: string) {
        return prisma.user.findUnique({ where: { uuid } });
    }

    async updateUser(uuid: string, updates: Partial<TypeUser>) {
        return prisma.user.update({
            where: { uuid },
            data: updates,
        });
    }
    
    async deleteUser(uuid: string) {
        return prisma.user.delete({
            where: { uuid },
        });
    }
    
}
