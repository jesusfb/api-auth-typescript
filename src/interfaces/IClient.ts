import { Document } from "mongoose";

interface IClient extends Document{
    name: string,
    email: string,
    phoneNumber: string,
    addres: string,
    cpf: string
};

export default IClient;