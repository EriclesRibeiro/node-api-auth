import { Request, Response } from "express";
import CreateUserController from "../controllers/create-user/create-user.controller";
import CreateUserRepository from "../repositories/create-user/create-user.repositorie";

class UserRoutes {
    public async createUser(req: Request, res: Response) {
        const createUserRepositorie = new CreateUserRepository()
        const createUserController = new CreateUserController(createUserRepositorie)

        const response = await createUserController.handle(req)
        res.status(response.status).json(response)
    }
}

export default UserRoutes