import { Controller, Delete, Get, Post, Put } from '@overnightjs/core';
import { NextFunction, Request, Response } from 'express';
import Client from '../model/client';
import { ParsedQs } from 'qs';
import { HandlerCastError } from '../error/handlerCastErro';

@Controller('api/v1/clients')
class ClientController {
    
  @Get('')
  public async getAllClients(req: Request, res: Response, next: NextFunction) {

    
    try {
      const { limitResult = 5, pag = 1} = req.query;
      if((limitResult as number) > 0 && (pag as number) > 0) {
        const clients =  await Client.find()
          .sort({ name: 1 })
          .skip(((pag as number) - 1) * (limitResult as number))
          .limit(limitResult as number)
          .exec();
        res.status(200).json(clients);        
      } else {
        next(new HandlerCastError());
      }
    } catch (error) {
      next(error);
    }
  }

  @Get('filter')
  public async getFilterClients(req: Request, res: Response, next: NextFunction) {
    const { name, email } = req.query;  
    
    const filter: { 
      name?: string | string[] | ParsedQs | ParsedQs[]; 
      email?:  string | string[] | ParsedQs | ParsedQs[];
    } = {};

    if (name) filter.name = { $regex: name, $options: 'i'}; //operadores do mongodb
    if (email) filter.email  = { $regex: email, $options: 'i'};
    
    try {
      const client = await Client.find(filter);
      res.status(200).json(client);
    } catch (error) {
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
  public async updateClient(
    req: Request, 
    res: Response, 
    next: NextFunction) {
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

  @Post('addvenda/:id')
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