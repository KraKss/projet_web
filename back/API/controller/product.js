import prisma from "../../database/databseORM.js";
import {productSchema, updateProductSchema} from "../middleware/validator/product.js";

export const getProductById = async (req, res)=> {
    try {
        const product = await prisma.product.findUnique({
            where:{
                id: parseInt(req.params.id)
            }
        });

        if (product) res.send(product);
        else res.sendStatus(404);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            orderBy:{
                id: "asc"
            }
        });

        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).send("No products found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while fetching products");
    }
};

export const addProduct = async (req, res) => {
    try {
        const {seller_id, name, description, price, filament_type} = req.body;

        const validatedBody = productSchema.parse({
            seller_id, name, description, price, filament_type
        })

        const {id} = await prisma.product.create({
            data: validatedBody,
            select: {
                id: true
            }
        })
        console.log("product created")
        res.status(201).send({id})
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            error: "une erreur est survenue",
            details: e.message
        });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const {id, seller_id, name, description, price, filament_type} = req.body;

        const validateBody = updateProductSchema.parse({
            seller_id, name, description, price, filament_type
        })

        const updateData = {};
        if (validateBody.seller_id !== undefined) updateData.seller_id = seller_id;
        if (validateBody.name !== undefined) updateData.name = name;
        if (validateBody.description !== undefined) updateData.description = description;
        if (validateBody.price !== undefined) updateData.price = price;
        if (validateBody.filament_type !== undefined) updateData.filament_type = filament_type;

        await prisma.product.update({
            data: updateData,
            where: {
                id: id
            }
        })
        console.log("product updated")
        res.sendStatus(204);

    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
}

export const deleteProductById = async (req, res) => {
    try {
        await prisma.product.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        console.log(`product ${req.params.id} deleted`)
        res.sendStatus(204);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}