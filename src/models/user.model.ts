import { TypeUser } from "#src/types/User.js";
import { prisma } from "#src/services/prisma.service.js";

export class User { 
    async findUser(email: string){
        return await prisma.user.findFirst({
            where: { email }
        })
    }

    async createUser(data: TypeUser){
        const { email, password, token} = data

        return await prisma.user.create({
            data: {
                email,
                password,
                is_email_verified: false,
                token
            }
        })
    }

    async findUserByToken(token: string){
        return await prisma.user.findFirst({
            where: { token }
        })
    }

    async emailStatus(data: any) {
        const { email, is_email_verified, token } = data
        return await prisma.user.update({
            where: { email },
            data: { token, is_email_verified: is_email_verified },
        });
    }
    
 }