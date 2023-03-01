import { Document } from "mongoose";
import ISales from "./ISales";

interface IClient extends Document{
    name: string,
    email: string,
    phoneNumber: string,
    addres: string,
    cpf: string,
    sales: ISales[]
}

export default IClient;