import Router from 'express-promise-router';

// import {default as productRouter} from './product.js';
// import {default as managerRouter} from './manager.js';
// import {default as purchaseRouter} from './purchase.js';
// import {default as clientRouter} from './client.js';

import {default as profileRouter} from "./profile.js";
import {default as productRouter} from "./product.js";
import {default as reviewRouter} from "./review.js";

const router = Router();

router.use("/api/profile", profileRouter);
router.use("/api/product", productRouter);
router.use("/api/review", reviewRouter);

// router.use('/client', clientRouter);
// router.use('/product', productRouter);
// router.use('/manager', managerRouter);
// router.use('/purchase', purchaseRouter);

export default router;