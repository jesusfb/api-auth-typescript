import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { HttpErro } from '../../error/httpErro';
import { HandlerCastError } from '../../error/handlerCastErro';
import { HandleValidationErro } from '../../error/handlerValidationErrro';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function handlerError(error: Error, _: Request, res: Response, next: NextFunction) {
  //CastError um dado q o mongoose não estava esperando, como um z minusculo no lugar de um numero um no id
  if (error instanceof mongoose.Error.CastError) {
    new HandlerCastError().sendMessageErro(res);
  }else if(error instanceof mongoose.Error.ValidationError) {
    new HandleValidationErro(error).sendMessageErro(res);  
  }else if(error instanceof HttpErro) {
    error.sendMessageErro(res);
  }
  else {
    new HttpErro().sendMessageErro(res);
  }
}