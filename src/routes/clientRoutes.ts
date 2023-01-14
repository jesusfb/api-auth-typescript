import { Router } from "express";
import ClientController from "../controller/ClientController";

const clientRouter = Router();

clientRouter
    .get('/', ClientController.getAllClients)
    .get('/:id', ClientController.getClients)
    .post('/', ClientController.createClient)
    .put('/:id', ClientController.updateClient)
    .post('/addvenda/:id', ClientController.addSale)
    .delete('/:id', ClientController.deleteClient)

export default clientRouter;