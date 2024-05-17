import { Router } from "express";
import ReviewsController from "./reviews.controller";
import authMiddleware from "../../middlewares/authMiddleware";
const reviewsRoutes = Router();

reviewsRoutes.get("/all-reviews", ReviewsController.getAllReviews);
reviewsRoutes.post("/review-create", ReviewsController.createAReview);

export default reviewsRoutes;
