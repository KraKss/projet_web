import {z} from "zod";

/**
 * @swagger
 * components:
 *  schemas:
 *      ReviewToAdd:
 *          type: object
 *          properties:
 *              reviewer_id:
 *                  type: integer
 *                  description: ID of the reviewer
 *              seller_id:
 *                  type: integer
 *                  description: ID of the seller
 *              rating:
 *                  type: number
 *                  minimum: 0
 *                  maximum: 5
 *                  description: Rating of the seller (0-5)
 *              comment:
 *                  type: string
 *                  description: Optional comment
 *              reviewer_profile:
 *                  type: object
 *                  description: Optional profile of the reviewer
 *
 *              seller_profile:
 *                  type: object
 *                  description: Optional profile of the seller
 *
 *          required:
 *              - reviewer_id
 *              - seller_id
 *              - rating
 *      ReviewToUpdate:
 *          type: object
 *          properties:
 *              reviewer_id:
 *                  type: integer
 *                  description: ID of the reviewer
 *              seller_id:
 *                  type: integer
 *                  description: ID of the seller
 *              rating:
 *                  type: number
 *                  minimum: 0
 *                  maximum: 5
 *                  description: Updated rating (0-5)
 *              comment:
 *                  type: string
 *                  description: Updated comment
 *          required:
 *              - reviewer_id
 *              - seller_id
 */


export const profileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    address: z.string().max(50).optional(),
    bank_account: z.string().optional(),
    balance: z.number().nonnegative("Balance can't be negative").optional()
})



export const updateProfileSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    email: z.string().email("Invalid email format").optional(),
    password: z.string().min(8, "Password must be at least 8 characters").optional(),
    address: z.string().max(50).optional(),
    bank_account: z.string().optional(),
    balance: z.number().nonnegative("Balance can't be negative").optional()
})