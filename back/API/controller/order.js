import prisma from "../../database/databseORM.js";
import {orderSchema, updateOrderSchema} from "../../validator/order.js";

export const getOrderById = async (req, res)=> {
    try {
        const order = await prisma.orders.findUnique({
            where: {
                order_id: parseInt(req.params.id)
            },
        });

        if (order) res.send(order);
        else res.sendStatus(404);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const addOrder = async (req, res) => {
    try {
        const {buyer_id, payment_status, shipping_status} = req.body;

        const validatedBody = orderSchema.parse({
            buyer_id, payment_status, shipping_status
        })

        // remove buyerId to join profile table (if profile doesn't exist => error)
        const validatedData = {
            payment_status: validatedBody.payment_status,
            shipping_status: validatedBody.shipping_status
        };

        const order = await prisma.orders.create({
            data: {
                ...validatedData,
                profile: {
                    connect: {
                        id: validatedBody.buyer_id
                    }
                }
            },
            include: {
                profile: true
            }
        })


        console.log(`order created`)
        res.status(201).send(order);
    } catch (e) {
        const errorMessage = e.code === "P2025" ? `Profile with ID ${req.body.buyer_id} doesn't exist` : e.message
        console.error(errorMessage);
        return res.status(500).json({
            error: "une erreur est survenue",
            details: errorMessage
        });
    }
}

export const updateOrder = async (req, res) => {
    try {
        const {order_id, buyer_id, payment_status, shipping_status} = req.body;

        const validatedBody = updateOrderSchema.parse({
            order_id, buyer_id, payment_status, shipping_status
        })

        const validatedData = {
            payment_status: validatedBody.payment_status,
            shipping_status: validatedBody.shipping_status
        }

        if (validatedData.payment_status === undefined && validatedData.shipping_status === undefined)
            return res.status(400).json({
                error: "No data provided to update order"
            });

        const includeProfile = validatedBody.buyer_id !== undefined;

        const order = includeProfile
            ? await prisma.orders.update({
                where: {
                    id: validatedBody.order_id
                },
                data: {
                    ...validatedData,
                    profile: {
                        connect: {
                            id: validatedBody.buyer_id
                        }
                    }
                },
                include: {
                    profile: true
                }
            })
            : await prisma.orders.update({
                where: {
                    id: validatedBody.order_id
                },
                data: {
                    ...validatedData
                }
            })

        console.log(`order updated`)
        res.status(201).send(order);
    } catch (e) {
        console.error(e.message);
        return res.status(500).json({
            error: "une erreur est survenue",
            details: e.message
        });
    }
}

export const deleteOrderById = async (req, res) => {
    try {
        await prisma.orders.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })

        console.log(`order ${req.params.id} deleted`)
        res.sendStatus(204);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}