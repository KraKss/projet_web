import prisma from "../../database/databseORM.js";
import {reviewSchema} from "../../validator/review.js";
import {findProfileById, getProfileById} from "./profile.js";
import {undefined} from "zod";

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

// export const addReview = async (req, res) => {
//     try {
//         const { reviewer_id, seller_id, rating, comment, reviewer_profile, seller_profile } = req.body;
//
//         const validatedBody = reviewSchema.parse({
//             reviewer_id, seller_id, rating, comment, reviewer_profile, seller_profile
//         });
//
//         const dataToInsert = {
//             rating: validatedBody.rating,
//             comment: validatedBody.comment
//         };
//
//         // const reviewerProfile = await findProfileById(reviewer_id);
//         // const sellerProfile = await findProfileById(seller_id);
//
//         const review = await prisma.review.create({
//             data: {
//                 ...dataToInsert,
//                 reviewer_id: {
//                     connectOrCreate: {
//                         where: {
//                             id: reviewer_id
//                         },
//                         create: {
//                             ...reviewer_profile
//                         }
//                     }
//                 },
//                 seller_id: {
//                     connectOrCreate: {
//                         where: {
//                             id: seller_id
//                         },
//                         create: {
//                             ...seller_profile
//                         }
//                     }
//                 }
//             },
//             include: {
//                 profile_review_reviewer_idToprofile: true,
//                 profile_review_seller_idToprofile: true
//             }
//         });
//
//         console.log("review added");
//         res.status(201).send(review);
//     } catch (e) {
//         console.error("Error: " + e);
//         return res.status(500).json({
//             error: "An error occurred",
//             details: e.message
//         });
//     }
// };

// export const updateReview = async (req, res) => {
//     try {
//         const {id, seller_id, name, description, price, filament_type} = req.body;
//
//         const validateBody = updateProductSchema.parse({
//             seller_id, name, description, price, filament_type
//         })
//
//         const updateData = {};
//         if (validateBody.seller_id !== undefined) updateData.seller_id = seller_id;
//         if (validateBody.name !== undefined) updateData.name = name;
//         if (validateBody.description !== undefined) updateData.description = description;
//         if (validateBody.price !== undefined) updateData.price = price;
//         if (validateBody.filament_type !== undefined) updateData.filament_type = filament_type;
//
//         await prisma.review.update({
//             data: updateData,
//             where: {
//                 id: id
//             }
//         })
//         console.log("product updated")
//         res.sendStatus(204);
//
//     } catch (e) {
//         console.log(e)
//         res.sendStatus(500);
//     }
// }
//
// export const deleteReviewById = async (req, res) => {
//     try {
//         await prisma.review.delete({
//             where: {
//                 id: parseInt(req.params.id)
//             }
//         })
//         console.log(`product ${req.params.id} deleted`)
//         res.sendStatus(204);
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
// }