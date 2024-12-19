import Router from 'express-promise-router';

import {default as profileRouter} from "./profile.js";
import {default as productRouter} from "./product.js";
import {default as reviewRouter} from "./review.js";
import {default as orderRouter} from "./order.js";

const router = Router();

router.use("/api/profile", profileRouter);
router.use("/api/product", productRouter);
router.use("/api/review", reviewRouter);
router.use("/api/order", orderRouter);

export default router;