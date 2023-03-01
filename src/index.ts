import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import { config } from "./config/config";



import clientRouter from "./routes/clientRoutes";
import userRouter from "./routes/userRoutes";

import swaggerUI from 'swagger-ui-express';
import swaggerDocs from './swagger.json'
import { tokenAuthenticate } from "./auth/tokenAuthenticate";

const app = express();
const port = config.server.port;

mongoose.set('strictQuery', true);

//funcao para conectar com os banco, essa funcao analisa se mongoDb subiu antes do container node.
const connectWithRetry = () => {
    mongoose
        .connect(config.mongo.url)
        .then(() => console.log('Succesfully connected to DB'))
        .catch(error => {
            console.log(error);
            setTimeout(connectWithRetry, 5000);
        });
};

connectWithRetry();

//midlewares
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use('/api/v1/clients', tokenAuthenticate, clientRouter);
app.use('/api/v1/users', userRouter);



app.listen(port, () => console.log(`Welcome Api in port ${port}!`));

