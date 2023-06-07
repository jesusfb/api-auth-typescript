import { Controller, Delete, Get, Post, Put } from '@overnightjs/core';
import { NextFunction, Request, Response } from 'express';
import Client from '../model/client';

@Controller('api/v1/clients')
class ClientController {
    
    @Get('')
  public async getAllClients(req: Request, res: Response, next: NextFunction) {
    try {
      const clients =  await Client.find();
      res.status(200).json(clients);
    } catch (error) {
      //res.status(400).json((error as Error).message);
      next(error);
    }
  }

    @Get(':id')
    public async getClients(req: Request, res: Response, next: NextFunction) {
      const { id } = req.params;
      try {
        const client = await Client.findById(id);
        if(!client) {
          res.status(404).json(`Id ${id} não encontrado`);
        }            
        res.status(200).json(client);
      } catch (error) {
        next(error);
      }
    }

    @Post('')
    public async createClient(req: Request, res: Response, next: NextFunction) {
      const dataClient = req.body;
      try {
        const client = await Client.create(dataClient);
        res.status(201).json(client);
      } catch (error) {
        next(error);
      }
    }

    @Put(':id')
    public async updateClient(req: Request, res: Response, next: NextFunction) {
      const { id } = req.params;
      const dataClient = req.body;
      try {
        await Client.findByIdAndUpdate(id, dataClient);
        const client =  await Client.findById(id);
        res.status(200).json(client);
      } catch (error) {
        next(error);
      }
    }

    
    @Delete(':id')
    public async deleteClient(req: Request, res: Response, next: NextFunction) {
      const { id } = req.params;

      try {
        await Client.findByIdAndDelete(id);
        res.status(200).json(`Id ${id} deletado`);
      } catch (error) {
        next(error);
      }
    }

    @Post('/addvenda/:id')
    public async addSale(req: Request, res: Response, next: NextFunction) {
      const { id } = req.params;
      const dataSales = req.body;

      try {        
        const client = await Client.findById(id);
        client?.sales.push(dataSales); 
        await client?.save();       
        res.status(200).json(client);
      } catch (error) {
        next(error);
      }
    }
}


export default ClientController;