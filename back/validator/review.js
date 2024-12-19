import {z} from "zod";
import {profileSchema} from "./profile.js";

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
