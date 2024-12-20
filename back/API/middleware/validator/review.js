import {z} from "zod";
import {profileSchema} from "./profile.js";

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


export const reviewSchema = z.object({
    // TODO trim fields
    reviewer_id: z.number().nonnegative(),
    seller_id: z.number().nonnegative(),
    rating: z.number()
        .min(0, "Rating must be at least 0")
        .max(5, "Rating must not exceed 5"),
    comment: z.string().min(1, "comment must be at least 1 char").optional(),
    reviewer_profile: (z.union([profileSchema, z.array(profileSchema)])).optional(),
    seller_profile: (z.union([profileSchema, z.array(profileSchema)])).optional()
})

export const updateReviewSchema = z.object({
    reviewer_id: z.number().nonnegative("ReviewerId must be positive"),
    seller_id: z.number().nonnegative("sellerId must be positive"),
    rating: z.number()
        .min(0, "Rating must be at least 0")
        .max(5, "Rating must not exceed 5").optional(),
    comment: z.string().min(1, "comment must be at least 1 char").optional()
})
