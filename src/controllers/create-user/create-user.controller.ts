import Controller from "../../interfaces/controller";
import HttpRequest from "../../interfaces/httpRequest";
import HttpResponse from "../../interfaces/httpResponse";
import User from "../../models/user.model";
import { ICreateUserParams } from "./create-user.interfaces";

class CreateUserController implements Controller {
    async handle(params: HttpRequest<ICreateUserParams>): Promise<HttpResponse<User | string>> {
        return {
            status: 200,
            body: 'Requisição realizada com sucesso!'
        }
    }
}

export default CreateUserController