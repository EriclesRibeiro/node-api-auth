import { Request, Response } from "express";
import CreateUserController from "../controllers/create-user/create-user.controller";

class UserRoutes {
    public async createUser(req: Request, res: Response) {
        const createUserController = new CreateUserController()
        const response = await createUserController.handle(req)

        res.status(response.status).json(response)
    }
}

export default UserRoutes