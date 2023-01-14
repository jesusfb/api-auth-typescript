import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function tokenAuthenticate(req: Request, res: Response, next: NextFunction) {
    
    const authToken = req.headers.authorization;

    if(!authToken) {
        return res.status(401).json({
            status: 'token is missing',
            message: 'acesso negado'            
        });
    }

    const [, token] = authToken.split(" ");

    try {
        verify(token, 'sasasaassasa');

        next();
        
    } catch (error) { 
        res.status(401).json({
            status: 'token invalid',
            message: 'acesso negado'            
        });
    }
}