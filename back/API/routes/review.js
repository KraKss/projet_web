import Router from "express-promise-router";
import {getReviewBySellerId} from "../controller/review.js";

const router = Router();

// router.post("/", addReview);
// router.patch("/", updateReview);
router.get("/:id", getReviewBySellerId);
// router.delete("/:id", deleteReviewById);


export default router;