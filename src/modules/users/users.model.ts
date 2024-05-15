import { model, Schema } from "mongoose";
import { IAllUsers } from "./users.interface";

const AllUsersSchema = new Schema<IAllUsers>(
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

export const AllUsersModel = model<IAllUsers>("users", AllUsersSchema, "users");
