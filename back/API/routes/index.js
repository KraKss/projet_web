import Router from 'express-promise-router';

import {default as profileRouter} from "./profile.js";
import {default as productRouter} from "./product.js";
import {default as reviewRouter} from "./review.js";
import {default as orderRouter} from "./order.js";
import {default as orderItemsRouter} from "./orderItems.js";

const router = Router();

router.use("/api/profile", profileRouter);
router.use("/api/product", productRouter);
router.use("/api/review", reviewRouter);
router.use("/api/order", orderRouter);
router.use("/api/order/items", orderItemsRouter);

router.use((req, res) => {
    console.error(`Bad URL: ${req.path}`);
    return res.status(404).send("Il ne s'agit pas d'une URL prise en charge par l'application");
});

export default router;