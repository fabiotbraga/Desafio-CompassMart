import { IUserResponse, IUser, AuthenticateResponse } from '../interfaces/IUser';
import UserRepository from '../repositories/UserRepository';
import PasswordInvalid from '../errors/PasswordNotFound';
import UserEmailExists from '../errors/UserEmailExists';
import  UserNotFound from '../errors/UserNotFound';
import { ObjectId } from 'mongoose';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class UserService {
  async create (payload: IUser): Promise<AuthenticateResponse> {
    const verify = await UserRepository.verifyEmail(payload.email);
    if (verify !== null) throw new UserEmailExists();
    payload.password = await bcrypt.hash(payload.password, Number(process.env.SALT));
    const payloadUser = await UserRepository.create(payload);
    const result = {
      id: payloadUser.id,
      email: payloadUser.email,
    };
    return result;
  }

  async authenticate (payload: IUser): Promise<AuthenticateResponse> {
    const verify = await UserRepository.verifyEmail(payload.email);
    if (verify === null) throw new UserNotFound();
    const verifyPass = await bcrypt.compare(payload.password, verify.password)
    if (!verifyPass) throw new PasswordInvalid();
    const token = jwt.sign({ id: verify.id }, process.env.JWT_KEY, {
      expiresIn: process.env.EXPIRE_IN
    });
    const result = { email: verify.email, token: token };
    return result;
  }

  async findAll (): Promise<IUserResponse[]> {
    return await UserRepository.findAll();
  }
  
  async findById (id: ObjectId): Promise<IUserResponse | null> {
    const result = await UserRepository.findById(id);
    return result;
  }

 
  async updateUser (id: ObjectId, payload: IUser): Promise<IUserResponse|null> {
    const result = await UserRepository.update(id, payload);
    return result;
  }

  async delete (id: ObjectId): Promise<IUserResponse | null> {
    const result = await UserRepository.delete(id);
    return result;
  }
}

export default new UserService()