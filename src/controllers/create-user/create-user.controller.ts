import Controller from "../../interfaces/controller";
import HttpRequest from "../../interfaces/httpRequest";
import HttpResponse from "../../interfaces/httpResponse";
import User from "../../models/user.model";
import { ICreateUserRepository } from "../../repositories/create-user/create-user.interface";
import { ICreateUserParams } from "./create-user.interfaces";

class CreateUserController implements Controller {
    constructor(private readonly createUserRepositorie: ICreateUserRepository) { }
    async handle(request: HttpRequest<ICreateUserParams>): Promise<HttpResponse<User | string>> {
        try {

            const { body } = request

            if (!body) {
                return {
                    status: 400,
                    body: 'Por favor, especifique um corpo para a requisição'
                }
            }

            const required = ["firstName", "lastName", "email", "password"]
            for (const field of required) {
                if (!body[field as keyof ICreateUserParams]?.length) {
                    return {
                        status: 400,
                        body: `O campo ${field} é obrigatório`
                    }
                }
            }

            const user = await this.createUserRepositorie.create(body)

            return {
                status: 201,
                body: user
            }
        } catch (error) {
            return {
                status: 500,
                body: 'Ocorreu um erro inesperado'
            }
        }
    }
}

export default CreateUserController