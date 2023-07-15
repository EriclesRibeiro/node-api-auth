import { log } from "console"
import express, { Application, Request, Response, Router } from "express"
import CreateUserController from "./controllers/create-user/create-user.controller"
import UserRoutes from "./routes/user-routes"
import Populate from "./database/populate"

class Server {
    private app: Application
    private port: number

    constructor(port: number) {
        this.app = express()
        this.port = port

        this.initializeMiddleware()
        this.initializeRouters()
        this.initializePopulate()
        this.initializeServer()
    }

    private initializeMiddleware() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }

    private initializeRouters() {
        const userRoutes = new UserRoutes()

        this.app.use("/api/register", userRoutes.createUser)
        this.app.use("/api/login", userRoutes.signIn)
    }

    private initializePopulate() {
        const populate = new Populate()
        populate.execute()
    }

    private initializeServer() {
        this.app.listen(this.port, () => {
            log(`Server is running on port ${this.port}!`)
        })
    }

    private populateDatabase() {

    }
}

export default Server