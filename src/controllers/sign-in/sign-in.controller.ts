import Controller from "../../interfaces/controller";
import HttpRequest from "../../interfaces/httpRequest";
import HttpResponse from "../../interfaces/httpResponse";
import { ISignInRepository } from "../../repositories/sign-in/sign-in.interface";
import { ISignInParams, ISignInResponse } from "./sign-in.interfaces";

class SignInController implements Controller {
    constructor(private readonly signInRepository: ISignInRepository) { }
    async handle(params: HttpRequest<ISignInParams>): Promise<HttpResponse<ISignInResponse | string>> {
        try {
            const { body } = params

            if (!body) {
                return {
                    status: 400,
                    body: 'Por favor, especifique um corpo para a requisição'
                }
            }

            const required = ["email", "password"]
            for (const field of required) {
                if (!body[field as keyof ISignInParams]?.length) {
                    return {
                        status: 400,
                        body: `O campo ${field} é obrigatório`
                    }
                }
            }

            const response = await this.signInRepository.create(body)

            return {
                status: 200,
                body: response
            }

        } catch (error: any) {
            return {
                status: 500,
                error: error.message
            }
        }

    }
}

export default SignInController