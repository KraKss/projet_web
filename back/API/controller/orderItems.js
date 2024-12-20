import prisma from "../../database/databseORM.js";
import {itemSchema, requestBodySchema} from "../middleware/validator/orderItems.js";

/**
 * @swagger
 * components:
 *  schemas:
 *      Order:
 *          type: object
 *          properties:
 *              order_id:
 *                  type: integer
 *                  description: ID of the order
 *              buyer_id:
 *                  type: integer
 *                  description: ID of the buyer
 *              payment_status:
 *                  type: string
 *                  description: Payment status of the order
 *              shipping_status:
 *                  type: string
 *                  description: Shipping status of the order
 *  responses:
 *      OrderResponse:
 *          description: The order details
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Order'
 *      OrderListResponse:
 *          description: List of orders
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Order'
 *      OrderAdded:
 *          description: Order created successfully
 *      OrderUpdated:
 *          description: Order updated successfully
 *      OrderDeleted:
 *          description: Order deleted successfully
 */

export const getOrderItemsByOrderId = async (req, res)=> {
    try {
        const itemsList = await prisma.order_items.findMany({
            where: {
                order_id: parseInt(req.params.id)
            },
        });

        if (itemsList.length > 0) res.send(itemsList);
        else res.sendStatus(404);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const getAllOrderItems = async (req, res) => {
    try {
        const orderItems = await prisma.order_items.findMany({
            orderBy:{
                order_id_product_id: "asc"
            }
        });

        if (orderItems.length > 0) {
            res.status(200).json(orderItems);
        } else {
            res.status(404).send("No orderItems found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while fetching orderItems");
    }
};

export const addOrderItems = async (req, res) => {
    try {
        const { items } = req.body;

        const validatedBody = requestBodySchema.parse({ items });

        const orderItems = await prisma.order_items.createMany({
            data: validatedBody.items,
            skipDuplicates: true,
        });

        res.status(201).send(orderItems);
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({
            error: "Une erreur est survenue",
            details: e.message,
        });
    }
};


export const updateOrderItem = async (req, res) => {
    try {
        const { order_id, product_id, quantity } = req.body;

        const validatedBody = itemSchema.parse({
            order_id, product_id, quantity
        });

        const updatedItem = await prisma.order_items.update({
            where: {
                order_id_product_id: {
                    order_id: validatedBody.order_id,
                    product_id: validatedBody.product_id,
                }
            },
            data: {
                quantity: validatedBody.quantity,
            }
        })

        res.status(200).send(updatedItem);
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({
            error: "Une erreur est survenue",
            details: e.message,
        });
    }
};

export const deleteOrderItemById = async (req, res) => {
    try {
        await prisma.order_items.delete({
            where: {
                order_id_product_id: {
                    order_id: parseInt(req.params.order_id),
                    product_id: parseInt(req.params.product_id)
                }
            }
        })

        res.sendStatus(204);
    } catch (e) {
        console.error("Error: " + e);
        return res.status(500).json({
            error: "An error occurred",
            details: e.message
        });
    }
}
