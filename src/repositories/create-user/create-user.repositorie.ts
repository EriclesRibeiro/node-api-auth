import { ICreateUserParams } from "../../controllers/create-user/create-user.interfaces";
import prisma from "../../lib/prisma";
import User from "../../models/user.model";
import { ICreateUserRepository } from "./create-user.interface";

class CreateUserRepository implements ICreateUserRepository {
    async create(params: ICreateUserParams): Promise<User> {
        const emailExists = await prisma.user.findUnique({
            where: {
                email: params.email
            }
        })

        if (emailExists) {
            throw new Error('E-mail já está sendo utilizado')
        }

        const roles = await prisma.role.findMany({})

        if (!roles) {
            throw new Error('Roles não foram encontradas')
        }

        const user = await prisma.user.create({
            data: {
                email: params.email,
                firstName: params.firstName,
                lastName: params.lastName,
                password: params.password,
                roles: {
                    create: [
                        {
                            role: {
                                create: {
                                    name: 'member'
                                }
                            }
                        }
                    ]
                }
            }
        })

        if (!user) {
            throw new Error('Não foi possível criar o usuário')
        }

        return user
    }

}

export default CreateUserRepository