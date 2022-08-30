import { IUserResponse, IUser } from '../interfaces/IUser';
import UserRepository from '../repositories/UserRepository';
//import PasswordInvalid from '../errors/PasswordNotFound';
import { ObjectId } from 'mongoose';
import bcrypt from 'bcrypt';

class UserService {
  async create(payload: IUser): Promise<IUserResponse> {
    const result = await UserRepository.create(payload);
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