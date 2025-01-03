import Router from "express-promise-router";
import {
    addProduct,
    deleteProductById,
    getAllProducts,
    getProductById,
    updateProduct,
    getMostRecentProducts,
    getMostPopularProducts
} from "../controller/product.js";
import {manager} from "../middleware/auth/mustBe.js";

const router = Router();

/**
 * @swagger
 * /products/all:
 *  get:
 *      tags:
 *          - Products
 *      summary: Get all products
 *      responses:
 *          200:
 *              description: List of all products
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Product'
 *          500:
 *              description: Server error
 */
router.get("/all", manager, getAllProducts);

router.get("/recents", getMostRecentProducts);
router.get("/popular", getMostPopularProducts)

/**
 * @swagger
 * /products/{id}:
 *  get:
 *      tags:
 *          - Products
 *      summary: Get a product by ID
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID of the product to retrieve
 *      responses:
 *          200:
 *              description: Product details
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product not found
 *          500:
 *              description: Server error
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /products:
 *  post:
 *      tags:
 *          - Products
 *      summary: Add a new product
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *      responses:
 *          201:
 *              description: Product created successfully
 *          500:
 *              description: Server error
 */
router.post("/", manager, addProduct);

/**
 * @swagger
 * /products:
 *  patch:
 *      tags:
 *          - Products
 *      summary: Update an existing product
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *      responses:
 *          200:
 *              description: Product updated successfully
 *          500:
 *              description: Server error
 */
router.patch("/", manager, updateProduct);

/**
 * @swagger
 * /products/{id}:
 *  delete:
 *      tags:
 *          - Products
 *      summary: Delete a product by ID
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID of the product to delete
 *      responses:
 *          204:
 *              description: Product deleted successfully
 *          500:
 *              description: Server error
 */
router.delete("/:id", manager, deleteProductById);

export default router;
