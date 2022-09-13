import {
  IUserResponse,
  IUser,
  AuthenticateResponse
} from "../interfaces/IUser";
import UserRepository from "../repositories/UserRepository";
import {
  EmailExistsError,
  PasswordInvalid,
  UserNotFound
} from "../errors/userErrors";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require("jsonwebtoken");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require("bcrypt");

class UserService {
  async create(payload: IUser): Promise<AuthenticateResponse> {
    const verify = await UserRepository.verifyEmail(payload.email);
    if (verify !== null) throw new EmailExistsError();
    payload.password = await bcrypt.hash(
      payload.password,
      Number(process.env.SALT)
    );
    const payloadUser = await UserRepository.create(payload);
    const result = {
      id: payloadUser.id,
      email: payloadUser.email
    };
    return result;
  }

  async authenticate(payload: IUser): Promise<AuthenticateResponse> {
    const verify = await UserRepository.verifyEmail(payload.email);
    if (verify === null) throw new UserNotFound();
    const verifyPass = await bcrypt.compare(payload.password, verify.password);
    if (!verifyPass) throw new PasswordInvalid();
    const token = jwt.sign({ id: verify.id }, process.env.JWT_KEY, {
      expiresIn: process.env.EXPIRE_IN
    });
    const result = { email: verify.email, token: token };
    return result;
  }

  async findAll(): Promise<IUserResponse[]> {
    return await UserRepository.findAll();
  }
}

export default new UserService();
