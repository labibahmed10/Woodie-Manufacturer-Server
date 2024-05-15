import { Model } from "mongoose";

export interface IAllUsers {
  name: string;
  email: string;
  role?: string;
  education?: string;
  location?: string;
  phone?: string;
  profile?: string;
}

export interface UserStaticMethods extends Model<IAllUsers> {
  isUserExistByEmail: (email: string) => Promise<IAllUsers>;
}
