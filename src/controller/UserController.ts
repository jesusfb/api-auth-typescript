import { Controller, Post, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import User from '../model/user';

@Controller('api/v1/users')
class UserController {

    @Post('register')
  public async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {       
      const user = await User.create({
        name,
        email,
        password
      });

      res.status(201).json(user);

    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }



    @Get('')
    public async getUsers(req: Request, res: Response) {
      try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (error) {
        res.status(400).json(((error as Error).message));
      }
    }
     


   
}

export default UserController;