import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/IUser'

const UserSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
}, { versionKey: false });

const User = mongoose.model<IUser>('user', UserSchema);
export default User