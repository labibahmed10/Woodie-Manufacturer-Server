import catchAsyncFunc from "../../utils/catchAsyncFunc";
import ReviewServices from "./reviews.services";

const getAllReviews = catchAsyncFunc(async (req, res) => {
  const result = await ReviewServices.getAllReviewsFromDB();

  return res.status(200).json({
    data: result,
  });
});

const createAReview = catchAsyncFunc(async (req, res) => {
  const result = await ReviewServices.createAReviewIntoDB(req.body);
  return res.status(200).json({
    result,
  });
});

const ReviewsController = {
  getAllReviews,
  createAReview,
};

export default ReviewsController;
