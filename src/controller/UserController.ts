import { Controller, Post, Get } from '@overnightjs/core';
import { compare, genSalt, hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import IUser from '../interfaces/IUser';
import User from '../model/user';

@Controller('api/v1/users')
class UserController {

    @Post('register')
  public async register(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const userAlreadyExists = await User.findOne({
        username: username
      });

      if(userAlreadyExists) {
        res.status(400).json('user already exists!');              
                
      }

      const salt = await genSalt(12);
      const passwordHash = await hash(password, salt);
            
      const user = await User.create({
        username,
        password: passwordHash
      });

      res.status(201).json(user);

    } catch (error) {
      res.status(400).json((error as Error).message);
    }
  }

    @Post('login')
    public async login(req: Request, res: Response) {

      const { username, password } = req.body;
      //const secret = config.auth.secret;

      function createToken(user: IUser) {
        const payload = {
          id: user.id
        };

        const token = sign(payload, 'sasasaassasa', { expiresIn: '35m'});

        return token;
      }

        

      try {
        const user = await User.findOne({ username });        
        if(!user) {
          return res.status(404).json('User not found');
        }

        const passwordIsCorrect = await compare(password, user.password);

        if(passwordIsCorrect) {
          const token = createToken(user);
          res.set('Authorization', token);
          res.status(200).json(user);
        } else{
          res.status(400).json('Incorrect password');  
        }
            
      } catch (error) {
        res.status(400).json(((error as Error).message));
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