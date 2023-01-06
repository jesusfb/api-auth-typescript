import { Request, Response } from "express";
import Client from "../model/client";

class ClientController {
    

    static async getAllClients(req: Request, res: Response) {
        try {
            const clients =  await Client.find();
            res.status(200).json({
                status: 'sucess',
                results: clients.length,
                data: {
                    clients
                }
            });
        } catch (error) {
            res.status(400).json({
                status: 'fail'
            });
        };
    };

    static async getClients(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const client = await Client.findById(id);

            if(!client) {
                res.status(404).json({
                    status: 'fail'
                });
            }
            
            res.status(200).json({
                status: 'sucess',
                data: {
                    client
                }
            });
        } catch (error) {
            res.status(404).json({
                status: 'fail'
            });
        };
    };

    static async createClient(req: Request, res: Response) {
        const dataClient = req.body;
        try {
            const client = await Client.create(dataClient);
            res.status(201).json({
                status: 'sucess',
                data: {
                    client
                }
            });
        } catch (error) {
            res.status(401).json({
                status: 'fail'
            });
        };
    };

    static async updateClient(req: Request, res: Response) {
        const { id } = req.params;
        const dataClient = req.body;
        try {
            await Client.findByIdAndUpdate(id, dataClient);
            const client =  await Client.findById(id);
            res.status(200).json({
                status: 'sucess',
                data: {
                    client
                }
            });
        } catch (error) {
            res.status(400).json({
                status: 'fail'
            });
        };
    };

    

    static async deleteClient(req: Request, res: Response) {
        const { id } = req.params;

        try {
            await Client.findByIdAndDelete(id);
            res.status(200).json({
                status: 'sucess',
                message: `Id ${id} deletado`
            });
        } catch (error) {
            res.status(400).json({
                status: 'fail'
            });
        };
    };
};


export default ClientController;