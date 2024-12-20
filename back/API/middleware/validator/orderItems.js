import {z} from "zod";

/**
 * @swagger
 * components:
 *  schemas:
 *      OrderItem:
 *          type: object
 *          properties:
 *              order_id:
 *                  type: integer
 *                  description: ID of the order
 *              product_id:
 *                  type: integer
 *                  description: ID of the product
 *              quantity:
 *                  type: integer
 *                  description: Quantity of the product in the order
 *          required:
 *              - order_id
 *              - product_id
 *              - quantity
 *      OrderItemsRequest:
 *          type: object
 *          properties:
 *              items:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          order_id:
 *                              type: integer
 *                              description: ID of the order
 *                          product_id:
 *                              type: integer
 *                              description: ID of the product
 *                          quantity:
 *                              type: integer
 *                              description: Quantity of the product in the order
 *                      required:
 *                          - order_id
 *                          - product_id
 *                          - quantity
 *          required:
 *              - items
 */



export const itemSchema = z.object({
    order_id: z.number().nonnegative(),
    product_id: z.number().nonnegative(),
    quantity: z.number().nonnegative(),
});

export const requestBodySchema = z.object({
    items: z.array(itemSchema),
});