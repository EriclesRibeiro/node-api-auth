import User from "../../models/user.model"

interface ICreateUserParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface ICreateUserRepository {
    create(): Promise<User>
}

export {
    ICreateUserRepository,
    ICreateUserParams
}