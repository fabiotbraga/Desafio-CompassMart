import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/IUser'

const schema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
}, { versionKey: false} )

const User = mongoose.model<IUser>('user', schema);
export default User