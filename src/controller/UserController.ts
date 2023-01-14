import { compare, genSalt, hash } from "bcryptjs";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import IUser from "../interfaces/IUser";
import User from "../model/user";

class UserController {

    static async register(req: Request, res: Response) {
        const { username, password } = req.body;

        try {
            const userAlreadyExists = await User.findOne({
                username: username
            });

            if(userAlreadyExists) {
                res.status(400).json({
                    status: 'fail',
                    message: 'user already exists!'
                })
                
                
            };

            const salt = await genSalt(12);
            const passwordHash = await hash(password, salt)
            
            const user = await User.create({
                username,
                password: passwordHash
            });

            res.status(201).json({
                status: 'sucess',
                data: {
                    user
                }
            });

        } catch (error) {
            console.log(error);
            res.status(401).json({
                status: 'fail'
            });
        };
    }

    static async login(req: Request, res: Response) {

        const { username, password } = req.body;
        //const secret = config.auth.secret;

        function createToken(user: IUser) {
            const payload = {
                id: user.id
            };

            const token = sign(payload, 'sasasaassasa', { expiresIn: '35m'});

            return token;
        };

        

        try {
            const user = await User.findOne({ username });        
            if(!user) {
                return res.status(404).json({
                    status: 'fail',
                    message: 'User not found'
                });
            };

            const passwordIsCorrect = await compare(password, user.password);

            if(passwordIsCorrect) {
                const token = createToken(user);
                res.set('Authorization', token);
                res.status(200).json({
                    status: 'success',
                    data: {
                        user
                    }
                });
            } else{
                res.status(400).json({
                    status: 'fail',
                    message: 'Incorrect password'
                });  
            };
            
        } catch (error) {
            res.status(400).json({
                status: 'login fail'
            })
        }

    }   

    static async getUsers(req: Request, res: Response) {
        try {
            const users = await User.find();
            res.status(200).json(users)
        } catch (error) {
            res.status(400).json(error)
        }
    }
     


   
};

export default UserController;