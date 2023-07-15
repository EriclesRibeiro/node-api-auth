import { Request, Response } from "express";
import CreateUserController from "../controllers/create-user/create-user.controller";
import CreateUserRepository from "../repositories/create-user/create-user.repositorie";
import SignInRepositorie from "../repositories/sign-in/sign-in.repositorie";
import SignInController from "../controllers/sign-in/sign-in.controller";

class UserRoutes {
    public async createUser(req: Request, res: Response) {
        const createUserRepositorie = new CreateUserRepository()
        const createUserController = new CreateUserController(createUserRepositorie)

        const response = await createUserController.handle(req)
        res.status(response.status).json(response)
    }

    public async signIn(req: Request, res: Response) {
        const signInRepositorie = new SignInRepositorie()
        const signInController = new SignInController(signInRepositorie)

        const response = await signInController.handle(req)
        res.status(response.status).json(response)
    }
}

export default UserRoutes