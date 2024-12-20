import Router from "express-promise-router";
import {
    addOrder,
    updateOrder,
    getAllOrders,
    getOrderById,
    deleteOrderById
} from "../controller/order.js";
import {manager} from "../middleware/auth/mustBe.js";

const router = Router();

/**
 * @swagger
 * /orders:
 *  post:
 *      tags:
 *          - Orders
 *      summary: Create a new order
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Order'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/OrderAdded'
 *          500:
 *              description: Server error
 */
router.post("/", manager, addOrder);

/**
 * @swagger
 * /orders:
 *  patch:
 *      tags:
 *          - Orders
 *      summary: Update an existing order
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Order'
 *      responses:
 *          200:
 *              $ref: '#/components/responses/OrderUpdated'
 *          400:
 *              description: No data provided to update
 *          500:
 *              description: Server error
 */
router.patch("/", manager, updateOrder);

/**
 * @swagger
 * /orders/all:
 *  get:
 *      tags:
 *          - Orders
 *      summary: Get all orders
 *      responses:
 *          200:
 *              $ref: '#/components/responses/OrderListResponse'
 *          404:
 *              description: No orders found
 *          500:
 *              description: Server error
 */
router.get("/all", manager, getAllOrders);

/**
 * @swagger
 * /orders/{id}:
 *  get:
 *      tags:
 *          - Orders
 *      summary: Get an order by ID
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID of the order to retrieve
 *      responses:
 *          200:
 *              $ref: '#/components/responses/OrderResponse'
 *          404:
 *              description: Order not found
 *          500:
 *              description: Server error
 */
router.get("/:id", getOrderById);

/**
 * @swagger
 * /orders/{id}:
 *  delete:
 *      tags:
 *          - Orders
 *      summary: Delete an order by ID
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID of the order to delete
 *      responses:
 *          204:
 *              $ref: '#/components/responses/OrderDeleted'
 *          500:
 *              description: Server error
 */
router.delete("/:id", manager, deleteOrderById);

export default router;
