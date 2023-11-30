import { ObjectId } from "mongoose";

type User = {
  email: string;
  name: string;
  avatarURL: string;
  phone: string;
  birthday: string;
  createdAt: string;
  updatedAt: string;
  telegram: string;
  token: string | null;
  _id: ObjectId;
  password?: string;
};

export default User;
