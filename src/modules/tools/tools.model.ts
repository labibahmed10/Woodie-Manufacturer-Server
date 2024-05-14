import { model, Schema } from "mongoose";
import { IAllTools } from "./tools.interface";

const ToolsSchema = new Schema<IAllTools>(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Tools name is required"],
    },
    desc: {
      type: String,
      trim: true,
      required: [true, "Tools description is required"],
    },
    avlQuan: {
      type: Number,
      required: [true, "Available quantity number is required"],
    },
    image: {
      type: String,
      required: [true, "Tools image is required"],
    },
    moq: {
      type: Number,
      required: [true, "Minimum Order Quantity number is required"],
    },
    pPerUnit: {
      type: Number,
      required: [true, "Price per unit value is required"],
    },
  },
  {
    versionKey: false,
  }
);

export const ToolsModel = model<IAllTools>("alltools", ToolsSchema);
