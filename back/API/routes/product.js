import Router from "express-promise-router";
import {addProduct, deleteProductById, getAllProducts, getProductById, updateProduct} from "../controller/product.js";

const router = Router();

router.post("/", addProduct);
router.patch("/", updateProduct);
router.get("/all", getAllProducts);
router.get("/:id", getProductById);
router.delete("/:id", deleteProductById);

export default router;