import { ICreateUserParams } from "../../controllers/create-user/create-user.interfaces"
import User from "../../models/user.model"

interface ICreateUserRepository {
    create(params: ICreateUserParams): Promise<User>
}

export {
    ICreateUserRepository
}