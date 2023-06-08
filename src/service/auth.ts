import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

export default class AuthService {
  public static async hashPassword(
    password: string, 
    salt = 10
  ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }


  public static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  public static generateToken(payload: object): string {
    return jwt.sign(payload, (config.auth.secret as string), {
      expiresIn: 20000,
    });
  }

  /*
  
  export interface DecodeUser extends Omit<User, '_id'> {
    id: string;
  }

  public static decodeToken(token: string): DecodeUser {
    return jwt.verify(token, (config.auth.secret as string)) as DecodeUser;
  }  
  
  */
}