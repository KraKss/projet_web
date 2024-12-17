import prisma from "../../database/databseORM.js";
import {profileSchema, updateProfileSchema} from "../../validator/profile.js";
import {hash} from "../../util/hash.js";

export const getProfileById = async (req, res)=> {
    try {
        const profile = await prisma.profile.findUnique({
            where: {
                id: parseInt(req.params.id),
            }
        });
        if (profile) {
            res.send(profile);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const addProfile = async (req, res) => {
    try {
        const {name, email, password, address, bank_account, balance} = req.body;

        const validatedBody = profileSchema.parse({
            name, email, password, address, bank_account, balance
        })
        const hashedPassword = await hash(password, 10);
        const validData = {
            ...validatedBody,
            password: hashedPassword
        }

        const {id} = await prisma.profile.create({
            data: validData,
            select: {
                id: true
            }
        })
        console.log("profile created")
        res.status(201).send({id})
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            error: "une erreur est survenue",
            details: e.message
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const {id, name, email, password, address, bank_account, balance} = req.body;

        const validateBody = updateProfileSchema.parse({
            name, email, password, address, bank_account, balance
        })

        const updateData = {};
        if (validateBody.name !== undefined) updateData.name = name;
        if (validateBody.email !== undefined) updateData.email = email;
        if (validateBody.password !== undefined) updateData.password = await hash(password, 10);
        if (validateBody.address !== undefined) updateData.address = address;
        if (validateBody.bank_account !== undefined) updateData.bank_account = bank_account;
        if (validateBody.balance !== undefined) updateData.balance = balance;

        await prisma.profile.update({
            data: updateData,
            where: {
                id: id
            }
        })
        console.log("profile updated")
        res.sendStatus(204);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export const deleteProfileById = async (req, res) => {
    try {
        await prisma.profile.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        console.log(`profile ${req.params.id} deleted`)
        res.sendStatus(204);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}