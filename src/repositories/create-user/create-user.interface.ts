import { ICreateUserParams } from "../../controllers/create-user/create-user.interfaces"
import User from "../../models/user.model"

interface ICreateUserRepositorie {
    create(params: ICreateUserParams): Promise<User>
}

export {
    ICreateUserRepositorie
}