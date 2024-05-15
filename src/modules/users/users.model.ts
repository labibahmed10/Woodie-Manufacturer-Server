import { model, Schema } from "mongoose";
import { IAllUsers, UserStaticMethods } from "./users.interface";

const AllUsersSchema = new Schema<IAllUsers, UserStaticMethods>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Your name is required"],
    },

    email: {
      type: String,
      unique: true,
      required: [true, "Your email is required"],
    },

    role: {
      type: String,
      enum: "admin",
    },

    education: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    profile: {
      type: String,
      trim: true,
    },
  },
  {
    versionKey: false,
  }
);

AllUsersSchema.statics.isUserExistByEmail = async function (email: string) {
  return await AllUsersModel.findOne({ email: email });
};

export const AllUsersModel = model<IAllUsers, UserStaticMethods>("users", AllUsersSchema, "users");
