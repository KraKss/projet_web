import {z} from "zod";

export const itemSchema = z.object({
    order_id: z.number().nonnegative(),
    product_id: z.number().nonnegative(),
    quantity: z.number().nonnegative(),
});

export const requestBodySchema = z.object({
    items: z.array(itemSchema),
});