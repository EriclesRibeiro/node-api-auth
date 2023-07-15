import { ISignInParams, ISignInResponse } from "../../controllers/sign-in/sign-in.interfaces"

interface ISignInRepository {
    create(params: ISignInParams): Promise<ISignInResponse>
}

export {
    ISignInRepository
}