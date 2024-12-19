import prisma from "../../database/databseORM.js";
import {orderSchema} from "../../validator/order.js";

export const getOrderById = async (req, res)=> {
    try {
        const order = await prisma.orders.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
        });

        if (order) res.send(order);
        else res.sendStatus(404);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const addOrder = async (req, res) => {
    try {
        const {order_id, buyer_id, payment_status, shipping_status} = req.body;

        const validatedBody = orderSchema.parse({
            order_id, buyer_id, payment_status, shipping_status
        })

        prisma.orders.create({
            data: {
            ...validatedBody
            },
            select: {
                id: true
            }
        })

        // const review = await prisma.review.create({
        //     data: {
        //         ...dataToInsert,
        //         profile_review_reviewer_idToprofile: reviewer_profile // demdande au prof si conditionnel ou obliger connectOrCreate
        //             ? {
        //                 connectOrCreate: {
        //                     where: { id: reviewer_id },
        //                     create: { ...reviewer_profile }
        //                 }
        //             }
        //             : { connect: { id: reviewer_id } },
        //
        //         profile_review_seller_idToprofile: seller_profile
        //             ? {
        //                 connectOrCreate: {
        //                     where: { id: seller_id },
        //                     create: { ...seller_profile }
        //                 }
        //             }
        //             : { connect: { id: seller_id } }
        //     },
        //     include: {
        //         profile_review_reviewer_idToprofile: true,
        //         profile_review_seller_idToprofile: true
        //     }
        // });

        console.log("order created")
        res.status(201).send(order);
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            error: "une erreur est survenue",
            details: e.message
        });
    }
}

// export const updateProfile = async (req, res) => {
//     try {
//         const {id, name, email, password, address, bank_account, balance} = req.body;
//
//         const validateBody = updateProfileSchema.parse({
//             name, email, password, address, bank_account, balance
//         })
//
//         const updateData = {};
//         if (validateBody.name !== undefined) updateData.name = name;
//         if (validateBody.email !== undefined) updateData.email = email;
//         if (validateBody.password !== undefined) updateData.password = await hash(password, 10);
//         if (validateBody.address !== undefined) updateData.address = address;
//         if (validateBody.bank_account !== undefined) updateData.bank_account = bank_account;
//         if (validateBody.balance !== undefined) updateData.balance = balance;
//
//         await prisma.profile.update({
//             data: updateData,
//             where: {
//                 id: id
//             }
//         })
//         console.log("profile updated")
//         res.sendStatus(204);
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
// }
//
// export const deleteProfileById = async (req, res) => {
//     try {
//         await prisma.profile.delete({
//             where: {
//                 id: parseInt(req.params.id)
//             }
//         })
//         console.log(`profile ${req.params.id} deleted`)
//         res.sendStatus(204);
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
// }