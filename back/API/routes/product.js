import Router from "express-promise-router";
import {addProduct, deleteProductById, getProductById, updateProduct} from "../controller/product.js";

const router = Router();

router.post("/", addProduct);
router.patch("/", updateProduct);
router.get("/:id", getProductById);
router.delete("/:id", deleteProductById);


export default router;