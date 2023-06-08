import  mongoose, { Document, Schema, model } from 'mongoose';
import AuthService from '../service/auth';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'user must have an name']
  },
  email: {
    type: String,
    required: [true, 'user must have an email']
  },
  password: {
    type: String,
    required: [true, 'user must have a password']
  }
});


userSchema.path('email').validate(
  async (email: string) => {
    const emailCount = await mongoose.models.User.countDocuments({ email });
    return !emailCount;
  },
  'already exists in the database.'
);


userSchema.pre<IUser>('save', async function() {
  //verificação para determinar se o campo password foi definido ou se ele foi modificado. 
  if(!this.password || !this.isModified('password')) {
    return;
  }

  try {
    const hashedPassword = await AuthService.hashPassword(this.password);
    this.password = hashedPassword;
  } catch (error) {
    console.log(`Error hasshing the password fpr the user ${this.name}`);
  }

});
const User = model<IUser>('User', userSchema);

export default User;   