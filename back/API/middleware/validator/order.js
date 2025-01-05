import {z} from "zod";

/**
 * @swagger
 * components:
 *  schemas:
 *      Order:
 *          type: object
 *          properties:
 *              buyer_id:
 *                  type: integer
 *                  description: ID of the buyer
 *              payment_status:
 *                  type: string
 *                  enum:
 *                      - pending
 *                      - completed
 *                      - failed
 *                  description: Payment status of the order
 *              shipping_status:
 *                  type: string
 *                  enum:
 *                      - not_shipped
 *                      - shipped
 *                      - delivered
 *                  description: Shipping status of the order
 *          required:
 *              - buyer_id
 *      OrderToUpdate:
 *          type: object
 *          properties:
 *              order_id:
 *                  type: integer
 *                  description: ID of the order to update
 *              buyer_id:
 *                  type: integer
 *                  description: ID of the buyer
 *              payment_status:
 *                  type: string
 *                  enum:
 *                      - pending
 *                      - completed
 *                      - failed
 *                  description: Updated payment status
 *              shipping_status:
 *                  type: string
 *                  enum:
 *                      - not_shipped
 *                      - shipped
 *                      - delivered
 *                  description: Updated shipping status
 *          required:
 *              - order_id
 */


export const orderSchema = z.object({
    buyer_id: z.number().nonnegative(),
    payment_status: z.enum(["pending", "completed", "failed"]).optional(),
    shipping_status: z.enum(["not_shipped", "shipped", "delivered","in_transit"]).optional()
})

export const updateOrderSchema = z.object({
    order_id: z.number().nonnegative(),
    buyer_id: z.number().nonnegative().optional(),
    payment_status: z.enum(["pending", "completed", "failed"]).optional(),
    shipping_status: z.enum(["not_shipped", "shipped", "delivered","in_transit"]).optional()
})
