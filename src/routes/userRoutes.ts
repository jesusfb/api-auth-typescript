import { Router } from "express";
import UserController from "../controller/UserController";

const userRouter = Router();

userRouter
    .post('/register', UserController.register)
    .post('/login', UserController.login)
    .get('/', UserController.getUsers)

export default userRouter;