import prisma from "../../database/databseORM.js";
import {orderSchema, updateOrderSchema} from "../middleware/validator/order.js";

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

export const getOrdersByBuyer = async (req, res) => {
    try {
        const buyerId = parseInt(req.params.buyer_id);

        if (isNaN(buyerId)) {
            return res.status(400).json({ error: "buyer_id invalide" });
        }

        // Récupérer uniquement les commandes du buyer_id
        const orders = await prisma.orders.findMany({
            where: { buyer_id: buyerId },
            orderBy: { order_date: "desc" } // Trier par date décroissante
        });

        if (!orders.length) {
            return res.status(404).json({ message: "Aucune commande trouvée pour cet utilisateur" });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
        res.status(500).json({ error: "Une erreur est survenue", details: error.message });
    }
};


export const createOrder = async (req, res) => {
    try {
        const { buyer_id, payment_status, shipping_status } = req.body;
        console.log("logtest",buyer_id, payment_status, shipping_status);
        if (!buyer_id || !payment_status || !shipping_status) {
            return res.status(400).json({ error: "Tous les champs sont requis (buyer_id, payment_status, shipping_status)." });
        }


        const newOrder = await prisma.orders.create({
            data: {
                buyer_id,
                payment_status,
                shipping_status,
                order_date: new Date(),
            },
            select: { id: true }
        });

        res.status(201).json({ order_id: newOrder.id });

    } catch (error) {
        console.error("Erreur lors de la création de la commande :", error);
        res.status(500).json({ error: "Erreur serveur", details: error.message });
    }
};


export const getAllOrders = async (req, res) => {
    try {
        const orders = await prisma.orders.findMany({
            orderBy:{
                id: "asc"
            }
        });

        if (orders.length > 0) {
            res.status(200).json(orders);
        } else {
            res.status(404).send("No orders found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while fetching orders");
    }
};

export const addOrder = async (req, res) => {
    try {
        const {buyer_id, payment_status, shipping_status} = req.body;

        const validatedBody = orderSchema.parse({
            buyer_id, payment_status, shipping_status
        })

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

        res.sendStatus(204);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
}