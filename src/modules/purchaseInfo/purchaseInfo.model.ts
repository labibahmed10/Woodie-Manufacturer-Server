import { model, Schema } from "mongoose";
import { IPurchaseInfo } from "./purchaseInfo.interface";

const PurchaseSchmea = new Schema<IPurchaseInfo>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Purchased person name is required"],
    },
    toolName: {
      type: String,
      trim: true,
      required: [true, "Tools name is required"],
    },
    email: {
      type: String,
      required: [true, "Purchased person email is required"],
    },
    address: {
      type: String,
      required: [true, "Purchased person address is required"],
    },
    avlQuan: {
      type: Number,
      required: [true, "Available quantity number is required"],
    },
    details: {
      type: String,
      required: [true, "Details is required"],
    },
    phone: {
      type: Number,
      required: [true, "Phone number is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity number is required"],
    },
    totalCost: {
      type: Number,
      required: [true, "Total cost is required"],
    },
    paid: {
      type: Boolean,
    },
    paymentID: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Shipped", "Pending"],
    },
    transictionID: {
      type: String,
    },
  },
  {
    versionKey: false,
    collection: "purchaseinfo",
  }
);

export const PurchaseInfoModel = model<IPurchaseInfo>("purchaseinfo", PurchaseSchmea, "purchaseinfo");
