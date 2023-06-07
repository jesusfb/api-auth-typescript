import { Document, Types } from 'mongoose';

interface ISales extends Document {
    _id: Types.ObjectId
    date_sale: Date,
    product: string,
    comments: string
}

export default ISales;