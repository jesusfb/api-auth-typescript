import mongoose, { connection } from "mongoose";
import { config } from "./config/config";

mongoose.set('strictQuery', true);


export const connectDB = async (): Promise<void> => {
    await mongoose.connect(config.mongo.url)
}

export const close = (): Promise<void> => connection.close()

