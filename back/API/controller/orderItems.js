import prisma from "../../database/databseORM.js";
import {itemSchema, requestBodySchema} from "../middleware/validator/orderItems.js";

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

export const addOrderItems = async (req, res) => {
    try {
        const { items } = req.body;

        const validatedBody = requestBodySchema.parse({ items });
        console.log(validatedBody.items);

        const orderItems = await prisma.order_items.createMany({
            data: validatedBody.items,
            skipDuplicates: true,
        });

        console.log(`order items created`);
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

        console.log("Order items updated");
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

        console.log(`order item deleted`)
        res.sendStatus(204);
    } catch (e) {
        console.error("Error: " + e);
        return res.status(500).json({
            error: "An error occurred",
            details: e.message
        });
    }
}
