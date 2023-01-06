import mongoose from 'mongoose';
import IClient from '../interfaces/IClient';

const clientSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Client must have a name']
    },
    email: {
        type: String,
        required: [true, 'Client must have a email']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Client must have a phoneNumber']
    },
    addres: {
        type: String,
        required: [true, 'Client must have a addres']
    },
    cpf:  {
        type: String,
        required: [true, 'Client must have a cpf']
    },
}
);

const Client = mongoose.model<IClient>('Client', clientSchema);

export default Client;