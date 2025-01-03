import prisma from "../../database/databseORM.js";
import {productSchema, updateProductSchema} from "../middleware/validator/product.js";

/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              seller_id:
 *                  type: integer
 *              name:
 *                  type: string
 *              description:
 *                  type: string
 *              price:
 *                  type: number
 *              filament_type:
 *                  type: string
 *  responses:
 *      ProductResponse:
 *          description: The product details
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *      ProductListResponse:
 *          description: List of all products
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Product'
 *      ProductAdded:
 *          description: Product created successfully
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: integer
 *      ProductUpdated:
 *          description: Product updated successfully
 *      ProductDeleted:
 *          description: Product deleted successfully
 */

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
// getMostPopularProducts
export const getMostPopularProducts = async (req, res) => {
    try {
        // Première étape : obtenir le top 5 des produits les plus commandés
        const products = await prisma.product.findMany({
            where: {
                order_items: {
                    some: {}, // Vérifier s'il existe des articles de commande associés
                },
            },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                order_items: {
                    select: {
                        product_id: true,
                    },
                },
            },
        });

        // Deuxième étape : compter les commandes pour chaque produit
        const productOrderCounts = await prisma.order_items.groupBy({
            by: ['product_id'],
            _count: {
                product_id: true, // Compter le nombre de fois que chaque produit est commandé
            },
            orderBy: {
                _count: {
                    product_id: 'desc', // Trier par nombre de commandes
                },
            },
            take: 5, // Limiter à 5 produits les plus commandés
        });

        // Fusionner les informations de produits avec leur nombre de commandes
        const topProducts = products
            .map((product) => {
                const orderCount = productOrderCounts.find(
                    (item) => item.product_id === product.id
                );
                return {
                    ...product,
                    order_count: orderCount ? orderCount._count.product_id : 0,
                };
            })
            .sort((a, b) => b.order_count - a.order_count); // Trier par nombre de commandes

        if (topProducts.length > 0) {
            res.status(200).json(topProducts);
        } else {
            res.status(404).send("No products found");
        }
    } catch (err) {
        console.error("Error fetching most ordered products:", err); // Affiche l'erreur dans la console
        res.status(500).send(`An error occurred while fetching products: ${err.message}`);
    }
};


export const getMostRecentProducts = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            orderBy: {
                id: "desc"
            },
            take: 4
        });

        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).send("No products found")
        }
    } catch (e) {
        console.error(err);
        res.status(500).send("An error occurred while fetching products");
    }
}

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

        res.sendStatus(204);

    } catch (e) {
        console.error(e)
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

        res.sendStatus(204);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
}