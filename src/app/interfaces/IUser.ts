import { Types } from 'mongoose';
export interface IUser { 
  email: string;
  password: string;
}

export interface IUserResponse {
  id?: String;
  email: String;
  password: String;
}

export interface AuthenticateResponse {
  id?: String;
  email: String;
  token?: String;
}