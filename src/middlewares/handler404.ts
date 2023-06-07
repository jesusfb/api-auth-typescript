import { NextFunction, Response, Request } from "express";
import { HandlerPagNotFound } from "../error/handlerPagNotFound";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function handler404(_:Request, res: Response, next: NextFunction) {
  new HandlerPagNotFound().sendMessageErro(res);
}