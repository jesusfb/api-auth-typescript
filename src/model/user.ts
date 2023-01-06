import mongoose from "mongoose";
import IUser from "../interfaces/IUser";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, 'user must have a username']
    },
    password: {
        type: String,
        required: [true, 'user must have a password']
    }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;   