import mongoose from "mongoose";
import { Schema, Model } from "mongoose";
interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  phone: string;
  accnum: string;
  bsb: string;
  accname: string;
  bankname: string;
  courseslist?: string;
}
const userSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  accnum: {
    type: String,
    required: true,
  },
  bsb: {
    type: String,
    required: true,
  },
  accname: {
    type: String,
    required: true,
  },
  bankname: {
    type: String,
    required: true,
  },
  courseslist: [
    {
      code: { type: String, required: true },
      cname: { type: String, required: true },
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
