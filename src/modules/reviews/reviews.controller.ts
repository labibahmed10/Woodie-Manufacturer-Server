import httpStatus from "http-status";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponse from "../../utils/sendResponse";
import ReviewServices from "./reviews.services";

const getAllReviews = catchAsyncFunc(async (req, res) => {
  const result = await ReviewServices.getAllReviewsFromDB();
  sendResponse(res, httpStatus.OK, "Successfully retrived all reviews", result);
});

const createAReview = catchAsyncFunc(async (req, res) => {
  const result = await ReviewServices.createAReviewIntoDB(req.body);
  sendResponse(res, httpStatus.OK, "Created a review", result);
});

const ReviewsController = {
  getAllReviews,
  createAReview,
};

export default ReviewsController;
