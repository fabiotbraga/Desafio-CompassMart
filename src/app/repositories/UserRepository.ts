import {
  AuthenticateResponse,
  IUser,
  IUserResponse
} from "../interfaces/IUser";
import UserSchema from "../schemas/UserSchema";

class UserRepository {
  async create(payload: IUser): Promise<IUserResponse | AuthenticateResponse> {
    return UserSchema.create(payload);
  }

  async findAll(): Promise<IUserResponse[]> {
    return await UserSchema.find();
  }

  async verifyEmail(email: string): Promise<IUserResponse | null> {
    return UserSchema.findOne({ email });
  }
}

export default new UserRepository();
