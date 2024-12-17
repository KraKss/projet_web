import Router from "express-promise-router";
import {getProfile} from "../controller/profile.js";

const router = Router();

// router.post("/", addProduct);
// router.patch("/", updateProduct);
router.get("/:id", getProfile);
// router.delete("/:id", deleteProduct);


export default router;