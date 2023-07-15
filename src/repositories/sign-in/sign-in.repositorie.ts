import { ISignInParams, ISignInResponse } from "../../controllers/sign-in/sign-in.interfaces";
import prisma from "../../lib/prisma";
import bcrypt from "../../utils/bcrypt";
import { ISignInRepository } from "./sign-in.interface";
import jwt from 'jsonwebtoken'

class SignInRepositorie implements ISignInRepository {
    async create(params: ISignInParams): Promise<ISignInResponse> {
        const user = await prisma.user.findUnique({
            where: {
                email: params.email
            },
            include: {
                roles: true
            }
        })

        if (!user) {
            throw new Error('Usuário não encontrado')
        }

        const bcryptHash = new bcrypt(user.password, params.password)
        const passwordIsCorrect = await bcryptHash.decode()

        if (!passwordIsCorrect) {
            throw new Error('Senha incorreta')
        }

        const privateKey = process.env.PRIVATE_KEY as string
        const token = jwt.sign({
            data: {
                email: user.email,
                name: user.firstName + ' ' + user.lastName,
                role: user.roles.map((role) => (role.roleId)),
            }
        }, privateKey)

        if (!token) {
            throw new Error('Não foi possível criar o token')
        }

        return {
            email: user.email,
            name: user.firstName + ' ' + user.lastName,
            token: token
        }
    }
}

export default SignInRepositorie