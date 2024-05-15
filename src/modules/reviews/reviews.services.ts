import { IAllReviews } from "./reviews.interface";
import { ReviewsModel } from "./reviews.model";

const getAllReviewsFromDB = async () => {
  const result = await ReviewsModel.find({});
  return result;
};

const createAReviewIntoDB = async (data: IAllReviews) => {
  const result = await ReviewsModel.create(data);
  return result;
};

const ReviewServices = {
  getAllReviewsFromDB,
  createAReviewIntoDB,
};
export default ReviewServices;
