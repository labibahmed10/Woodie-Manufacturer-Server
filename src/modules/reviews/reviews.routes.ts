import { Router } from "express";
import ReviewsController from "./reviews.controller";
const reviewsRoutes = Router();

reviewsRoutes.get("/all-reviews", ReviewsController.getAllReviews);
reviewsRoutes.post("/create", ReviewsController.createAReview);

export default reviewsRoutes;
