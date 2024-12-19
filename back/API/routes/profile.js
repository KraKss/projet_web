import Router from "express-promise-router";
import {addProfile, deleteProfileById, getProfileById, updateProfile} from "../controller/profile.js";

const router = Router();

router.post("/", addProfile);
router.patch("/", updateProfile);
router.get("/:id", getProfileById);
router.delete("/:id", deleteProfileById);

export default router;