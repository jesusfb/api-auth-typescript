import mongoose, { Model, Schema, Types } from 'mongoose';
import IClient from '../interfaces/IClient';
import ISales from '../interfaces/ISales';

type ClientModelType = Model<IClient>;

const clientSchema = new mongoose.Schema<IClient, ClientModelType>({

    name: {
        type: String,
        required: [true, 'Client must have a name']
    },
    email: {
        type: String,
        required: [true, 'Client must have a email'],
        minLengt: [6, 'Email must have more than 4 letters']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Client must have a phoneNumber']
    },
    addres: {
        type: String,
        required: [true, 'Client must have a addres'],
        minLengt: [3, 'Addres must have more than 4 letters']
    },
    cpf:  {
        type: String,
        required: [true, 'Client must have a cpf'],
        minLengt: [11, 'Cpf must have more than 11 letters'],
        maxLengt: [11, 'Email must have less than 11 letters']
    },
    sales: [new Schema<ISales>({
        id: {
            type: Types.ObjectId,
            unique: true
        },

        date_sale: {
            type: Date
        },
        product: {
            type: String
        },
        comments: {
            type: String
        }

    })]
});

const Client = mongoose.model<IClient, ClientModelType>('Client', clientSchema);

export default Client;