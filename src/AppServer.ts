import { Server } from "@overnightjs/core";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUI from 'swagger-ui-express';
import ClientController from "./controller/ClientController";
import UserController from "./controller/UserController";
import swaggerDocs from './swagger.json'
import * as database from './database'
export class AppServer extends Server {
    constructor() {
        super()
        this.init()
        
    }

    private async init(): Promise<void> {
        this.setupApp()
        this.setupController();
        await this.setupDataBase();
    }

    private setupApp() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
        this.app.use(cors())
    }

    private async setupDataBase(): Promise<void> {
        await database.connectDB()
    }

    private setupController() {
        const userController = new UserController()
        const clientController = new ClientController()

        super.addControllers([userController, clientController])
    }

   
    public async closeDB(): Promise<void> {
        await database.close()
    }

    public start(port: number) {
        this.app.listen(port, () => console.log('Servidor criado'))
    }
}