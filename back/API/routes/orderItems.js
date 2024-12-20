import Router from "express-promise-router";
import {
    addOrderItems,
    deleteOrderItemById,
    getAllOrderItems,
    getOrderItemsByOrderId,
    updateOrderItem
} from "../controller/orderItems.js";

const router = Router();

/**
 * @swagger
 * /order-items/all:
 *  get:
 *      tags:
 *          - Order Items
 *      summary: Get all order items
 *      responses:
 *          200:
 *              description: List of all order items
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/OrderItem'
 *          500:
 *              description: Server error
 */
router.get("/all", getAllOrderItems);

/**
 * @swagger
 * /order-items/{id}:
 *  get:
 *      tags:
 *          - Order Items
 *      summary: Get all order items for a specific order
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID of the order to retrieve items for
 *      responses:
 *          200:
 *              description: List of order items for the order
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/OrderItem'
 *          404:
 *              description: Order items not found
 *          500:
 *              description: Server error
 */
router.get("/:id", getOrderItemsByOrderId);

/**
 * @swagger
 * /order-items:
 *  post:
 *      tags:
 *          - Order Items
 *      summary: Add order items
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          items:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/OrderItem'
 *      responses:
 *          201:
 *              description: Order items created successfully
 *          500:
 *              description: Server error
 */
router.post("/", addOrderItems);

/**
 * @swagger
 * /order-items:
 *  patch:
 *      tags:
 *          - Order Items
 *      summary: Update an order item
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/OrderItem'
 *      responses:
 *          200:
 *              description: Order item updated successfully
 *          500:
 *              description: Server error
 */
router.patch("/", updateOrderItem);

/**
 * @swagger
 * /order-items/{order_id}/{product_id}:
 *  delete:
 *      tags:
 *          - Order Items
 *      summary: Delete an order item
 *      parameters:
 *          - in: path
 *            name: order_id
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID of the order
 *          - in: path
 *            name: product_id
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID of the product
 *      responses:
 *          204:
 *              description: Order item deleted successfully
 *          500:
 *              description: Server error
 */
router.delete("/:order_id/:product_id", deleteOrderItemById);

export default router;
