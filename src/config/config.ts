import dotenv from 'dotenv';

dotenv.config();

const SECRET_JWT = process.env.SECRET_JWT;
const MONGO_IP = process.env.MONGO_IP;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_URL = `mongodb+srv://jesusfb:Dove3229-@cluster0.yx9sjqo.mongodb.net/?authSource=admin`;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 4000;


export const config = {
  mongo: {
    url: MONGO_URL
  },
  auth: {
    secret: SECRET_JWT
  }
};
