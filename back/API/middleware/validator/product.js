import {z} from "zod";

/**
 * @swagger
 * components:
 *  schemas:
 *      ProductToAdd:
 *          type: object
 *          properties:
 *              seller_id:
 *                  type: integer
 *                  description: ID of the seller
 *              name:
 *                  type: string
 *                  description: Name of the product
 *              description:
 *                  type: string
 *                  description: Description of the product
 *              price:
 *                  type: number
 *                  description: Price of the product
 *              filament_type:
 *                  type: number
 *                  description: Type of filament (if applicable)
 *          required:
 *              - seller_id
 *              - name
 *              - price
 *      ProductToUpdate:
 *          type: object
 *          properties:
 *              seller_id:
 *                  type: integer
 *                  description: ID of the seller (optional)
 *              name:
 *                  type: string
 *                  description: Name of the product (optional)
 *              description:
 *                  type: string
 *                  description: Description of the product (optional)
 *              price:
 *                  type: number
 *                  description: Price of the product (optional)
 *              filament_type:
 *                  type: number
 *                  description: Type of filament (optional)
 */


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