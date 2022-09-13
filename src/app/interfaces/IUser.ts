import { Types } from "mongoose";
export interface IUser {
  email: string;
  password: string;
}

export interface IUserResponse {
  id?: string;
  email: string;
  password: string;
}

export interface AuthenticateResponse {
  id?: string;
  email: string;
  token?: string;
}
