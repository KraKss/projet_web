import {z} from "zod";
import {profileSchema} from "./profile.js";

export const reviewSchema = z.object({
    // TODO trim fields
    reviewer_id: z.number(),
    seller_id: z.number(),
    rating: z.number()
        .min(0, "Rating must be at least 0")
        .max(5, "Rating must not exceed 5"),
    comment: z.string().min(1, "comment must be at least 1 char").optional(),
    reviewer_profile: z.union([profileSchema, z.array(profileSchema)]).optional(),
    seller_profile: z.union([profileSchema, z.array(profileSchema)]).optional()
})

