import Router from "express-promise-router";
import {addProfile, deleteProfileById, getAllProfiles, getProfileById, updateProfile} from "../controller/profile.js";
import {authBasic} from "../middleware/auth/basic.js";
import {manager} from "../middleware/auth/mustBe.js";
import {upload} from "../middleware/multer/multer.js";
import express from "express";

const router = Router();

// router.post("/", upload.fields([
//     {name: 'name', maxCount: 1},
//     {name: 'email', maxCount: 1},
//     {name: 'password', maxCount: 1},
//     {name: 'address', maxCount: 1},
//     {name: 'bank_account', maxCount: 1},
//     {name: 'balance', maxCount: 1}
// ]), addProfile);
// router.post("/", express.json(), addProfile);
router.post("/", addProfile);
router.patch("/", updateProfile);
router.get("/all", getAllProfiles);
router.get("/:id", authBasic, manager, getProfileById);
router.delete("/:id", deleteProfileById);

export default router;