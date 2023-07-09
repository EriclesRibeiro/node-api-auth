import User from "../../models/user.model"

interface ICreateUserParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export {
    ICreateUserParams
}