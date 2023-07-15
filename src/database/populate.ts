import prisma from "../lib/prisma";
import bcrypt from "../utils/bcrypt";

class Populate {
    async execute() {
        let roles = await prisma.role.findMany()

        if (!roles || roles.length === 0) {
            await prisma.role.createMany({
                data: [
                    { name: 'member' },
                    { name: 'administrator' }
                ]
            })

            roles = await prisma.role.findMany()
            console.log('Role populate executed...')
        }

        let users = await prisma.user.findMany({
            where: {
                roles: {
                    some: {
                        OR: roles.map((roleId) => ({ roleId: roleId.id })),
                    }
                }
            }
        })

        if (!users || users.length === 0) {
            const bcryptHash = new bcrypt('admin123')
            const password = await bcryptHash.encode()

            let memberRole
            roles.forEach(role => {
                if (role.name === 'administrator') {
                    memberRole = role
                }
            })

            await prisma.user.create({
                data: {
                    email: 'auth.typescript@email.com',
                    firstName: 'User',
                    lastName: 'Admin',
                    password: password,
                    roles: {
                        create: {
                            roleId: memberRole!.id
                        }
                    }
                }
            })

            console.log('User populate executed...')
        }
    }
}

export default Populate