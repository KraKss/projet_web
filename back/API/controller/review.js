import prisma from "../../database/databseORM.js";
import {reviewSchema, updateReviewSchema} from "../middleware/validator/review.js";

export const getReviewBySellerId = async (req, res)=> {
    try {
        const review = await prisma.review.findMany({
            where:{
                seller_id: parseInt(req.params.id)
            }
        });
        if (review.length > 0) {
            res.send(review);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const addReview = async (req, res) => {
    try {
        const { reviewer_id, seller_id, rating, comment, reviewer_profile, seller_profile } = req.body;

        const validatedBody = reviewSchema.parse({
            reviewer_id, seller_id, rating, comment, reviewer_profile, seller_profile
        });

        const dataToInsert = {
            rating: validatedBody.rating,
            comment: validatedBody.comment
        };

        const review = await prisma.review.create({
            data: {
                ...dataToInsert,
                profile_review_reviewer_idToprofile: reviewer_profile // demdande au prof si conditionnel ou obliger connectOrCreate
                    ? {
                        connectOrCreate: {
                            where: { id: reviewer_id },
                            create: { ...reviewer_profile }
                        }
                    }
                    : { connect: { id: reviewer_id } },

                profile_review_seller_idToprofile: seller_profile
                    ? {
                        connectOrCreate: {
                            where: { id: seller_id },
                            create: { ...seller_profile }
                        }
                    }
                    : { connect: { id: seller_id } }
            },
            include: {
                profile_review_reviewer_idToprofile: true,
                profile_review_seller_idToprofile: true
            }
        });

        console.log("review added");
        res.status(201).send(review);
    } catch (e) {
        console.error("Error: " + e);
        return res.status(500).json({
            error: "An error occurred",
            details: e.message
        });
    }
};

export const updateReview = async (req, res) => {
    try {
        const { reviewer_id, seller_id, rating, comment } = req.body;

        const validateBody = updateReviewSchema.parse({
            reviewer_id, seller_id, rating, comment
        })

        const updateData = {};
        if (validateBody.rating !== undefined) updateData.rating = rating;
        if (validateBody.comment !== undefined) updateData.comment = comment

        if (Object.keys(updateData).length === 0) return res.status(400).json({
            error: "No data provided to update review"
        });

        await prisma.review.update({
            data: updateData,
            where: {
                reviewer_id_seller_id: {
                    reviewer_id: validateBody.reviewer_id,
                    seller_id: validateBody.seller_id
                }
            }
        })

        console.log("review updated")
        res.sendStatus(204);
    } catch (e) {
        console.error("Error: " + e);
        return res.status(500).json({
            error: "An error occurred",
            details: e.message
        });
    }
}

export const deleteReviewById = async (req, res) => {
    try {
        await prisma.review.delete({
            where: {
                reviewer_id_seller_id: {
                    reviewer_id: parseInt(req.params.reviewer_id),
                    seller_id: parseInt(req.params.seller_id)
                }
            }
        })

        console.log(`review deleted`)
        res.sendStatus(204);
    } catch (e) {
        console.error("Error: " + e);
        return res.status(500).json({
            error: "An error occurred",
            details: e.message
        });
    }
}