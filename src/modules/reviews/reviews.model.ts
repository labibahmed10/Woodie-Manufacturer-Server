import { model, Schema } from "mongoose";
import { IAllReviews } from "./reviews.interface";

const ReviewsSchema = new Schema<IAllReviews>(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Your name is required"],
    },

    image: {
      type: String,
      required: [true, "Image is required"],
    },

    ratings: {
      type: Number,
      required: [true, "Product review rating is required"],
      min: [1, "Minimum rating value is 1"],
    },

    text: {
      type: String,
      required: [true, "Text is required"],
    },
  },
  {
    versionKey: false,
  }
);

export const ReviewsModel = model<IAllReviews>("reviewcollection", ReviewsSchema, "reviewcollection");
