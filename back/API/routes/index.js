import Router from 'express-promise-router';

import {default as profileRouter} from "./profile.js";
import {default as productRouter} from "./product.js";
import {default as reviewRouter} from "./review.js";
import {default as orderRouter} from "./order.js";
import {default as orderItemsRouter} from "./orderItems.js";
import {login} from "../controller/login.js";
import {checkJWT} from "../middleware/auth/checkJWT.js";

const router = Router();

router.post("/api/login", login);
router.use("/api/profile", checkJWT, profileRouter);
router.use("/api/product", checkJWT, productRouter);
router.use("/api/review", checkJWT, reviewRouter);
router.use("/api/order", checkJWT, orderRouter);
router.use("/api/order/items", checkJWT, orderItemsRouter);

router.use((req, res) => {
    console.error(`Bad URL: ${req.path}`);
    return res.status(404).send("Il ne s'agit pas d'une URL prise en charge par l'application");
});

export default router;