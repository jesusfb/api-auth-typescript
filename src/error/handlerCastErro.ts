import { HttpErro } from "./httpErro";

export class HandlerCastError extends HttpErro {
  constructor(msgErro = 'Dados fornecidos estão incorretos') {
    super(msgErro, 400);
  }
}