import { HttpErro } from "./httpErro";

export class HandlerPagNotFound extends HttpErro {
  constructor() {
    super('Page not found', 404);
  }
}