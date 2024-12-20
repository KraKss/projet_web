import Router from "express-promise-router";
import {addProfile, deleteProfileById, getAllProfiles, getProfileById, updateProfile} from "../controller/profile.js";
import {authBasic} from "../middleware/auth/basic.js";
import {manager} from "../middleware/auth/mustBe.js";

const router = Router();

router.post("/", addProfile);
router.patch("/", updateProfile);
router.get("/all", getAllProfiles);
router.get("/:id", authBasic, manager, getProfileById);
router.delete("/:id", deleteProfileById);

export default router;