import {z} from "zod";

export const productSchema = z.object({
    // TODO trim fields
    seller_id: z.number().nonnegative(),
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "description must be at least 1 char").optional(),
    price: z.number().nonnegative(),
    filament_type: z.number().nonnegative().optional()
})

export const updateProductSchema = z.object({
    seller_id: z.number().nonnegative().optional(),
    name: z.string().min(1, "Name is required").optional(),
    description: z.string().min(1, "description must be at least 1 char").optional(),
    price: z.number().nonnegative().optional(),
    filament_type: z.number().nonnegative().optional()
})