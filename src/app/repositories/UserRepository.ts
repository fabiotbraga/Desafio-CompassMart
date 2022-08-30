import { IUser, IUserResponse} from '../interfaces/IUser';
import UserSchema from '../schemas/UserSchema';
import { ObjectId } from 'mongoose';

class UserRepository {
  async create(payload: IUser): Promise<IUserResponse> {
    return UserSchema.create(payload);
  }

  async findAll (): Promise<IUserResponse[]> {
    const Users = await UserSchema.find();
    return Users;
  }

  async findById (id: ObjectId): Promise<IUserResponse | null> {
    return UserSchema.findById({_id: id});
  }

  async update (id: ObjectId, payload: IUser): Promise<IUserResponse | null> {
    return await UserSchema.findOneAndUpdate({ _id: id }, payload, {returnOriginal: false});
  }

  async delete (id: ObjectId): Promise<IUserResponse | null> {
    return UserSchema.findByIdAndDelete({_id: id});
  }
}

export default new UserRepository();