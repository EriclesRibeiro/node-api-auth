import { log } from "console"
import express, { Application, Request, Response, Router } from "express"
import CreateUserController from "./controllers/create-user/create-user.controller"
import UserRoutes from "./routes/user-routes"

class Server {
    private app: Application
    private port: number
    private router: Router = Router()

    constructor(port: number) {
        this.app = express()
        this.port = port

        this.initializeMiddleware()
        this.initializeServer()
        this.initializeRouters()
    }

    private initializeMiddleware() {
        this.app.use(this.router)
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }

    private initializeRouters() {
        const userRoutes = new UserRoutes()

        this.router.post("/api/register", userRoutes.createUser)
    }

    private initializeServer() {
        this.app.listen(this.port, () => {
            log(`Server is running on port ${this.port}!`)
        })
    }
}

export default Server