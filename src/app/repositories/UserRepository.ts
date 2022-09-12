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

  async verifyEmail (email: String): Promise<IUserResponse | null> {
    return UserSchema.findOne({ email });
  }
}

export default new UserRepository();