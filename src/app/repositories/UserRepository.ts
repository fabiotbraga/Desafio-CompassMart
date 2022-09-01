import { AuthenticateResponse, IUser, IUserResponse} from '../interfaces/IUser';
import UserSchema from '../schemas/UserSchema';
import { ObjectId } from 'mongoose';

class UserRepository {
  async create (payload: IUser): Promise<IUserResponse | AuthenticateResponse> {
    return UserSchema.create(payload);
  }

  async findAll (): Promise<IUserResponse[]> {
    return await UserSchema.find();
  }

  async findById (id: ObjectId): Promise<IUserResponse | null> {
    return UserSchema.findById({_id: id});
  }

  async verifyEmail (email: String): Promise<IUserResponse | null> {
    return UserSchema.findOne({ email });
  }

  async update (id: ObjectId, payload: IUser): Promise<IUserResponse | null> {
    return await UserSchema.findOneAndUpdate({ _id: id }, payload, {returnOriginal: false});
  }

  async delete (id: ObjectId): Promise<IUserResponse | null> {
    return UserSchema.findByIdAndDelete({_id: id});
  }
}

export default new UserRepository();