import {z} from "zod";

export const orderSchema = z.object({
    // TODO trim fields
    order_id: z.number().nonnegative().optional(),
    buyer_id: z.number().nonnegative(),
    payment_status: z.enum(["pending", "completed", "failed"]).optional(),
    shipping_status: z.enum(["not_shipped", "shipped", "delivered"]).optional()
})

