import { Response } from "express";


export class HttpErro extends Error {
  private status: number;
  constructor(message = 'Server internal error', status = 500) {
    super();
    this.message = message;
    this.status = status;
  }

  public sendMessageErro(res: Response): void {
    res.status(this.status).send({
      message: this.message,
      status: this.status
    });    
  }
}