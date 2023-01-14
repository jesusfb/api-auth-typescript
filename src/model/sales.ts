import mongoose, { Model } from "mongoose";
import ISales from "../interfaces/ISales";

type SalesModelType = Model<ISales>;


const SalesSchema = new mongoose.Schema<ISales, SalesModelType>(
    {
        date_sale: {
            type: Date
        },
        product: {
            type: String,
            minLength: [4, 'Product must have more than 4 letters']
        },
        comments: {
            type: String,
            minLength: [4, 'Comments must have more than 4 letters']
        }
    }
);

const Sales = mongoose.model<ISales, SalesModelType>('Client', SalesSchema);

export default Sales;