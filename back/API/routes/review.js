import Router from "express-promise-router";
import {addReview, deleteReviewById, getAllReviews, getReviewBySellerId, updateReview} from "../controller/review.js";

const router = Router();

router.post("/", addReview);
router.patch("/", updateReview);
router.get("/all", getAllReviews);
router.get("/:id", getReviewBySellerId);
router.delete("/:reviewer_id/:seller_id", deleteReviewById);


export default router;