import mongoose from "mongoose";
import { HandlerCastError } from "./handlerCastErro";

export class HandleValidationErro extends HandlerCastError {
  constructor(erro: mongoose.Error.ValidationError) {
    const messageErro = Object.values(erro.errors).map(err => err.message).join('; ');
    super(`that error was found: ${messageErro}`);
  }
}