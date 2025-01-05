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

export const getMostPopularProducts = async (req, res) => {
    try {
        const topProducts = await prisma.$queryRaw`
            SELECT 
                p.id, 
                p.name, 
                p.description, 
                p.price, 
                p.seller_id,
                pr.name AS seller_name,
                SUM(oi.quantity) AS order_count
            FROM product p
            JOIN order_items oi ON p.id = oi.product_id
            JOIN profile pr ON p.seller_id = pr.id
            GROUP BY p.id, p.name, p.description, p.price, p.seller_id, pr.name
            ORDER BY order_count DESC
            LIMIT 4;
        `;

        const formattedProducts = topProducts.map((product) => ({
            ...product,
            price: Number(product.price),
            order_count: Number(product.order_count),
        }));

        if (formattedProducts.length > 0) {
            res.status(200).json(formattedProducts);
        } else {
            res.status(404).send("No products found");
        }
    } catch (err) {
        console.error("Error fetching most popular products:", err);
        res.status(500).send(`An error occurred while fetching products: ${err.message}`);
    }
};

export const getMostRecentProducts = async (req, res) => {
    try {
        const products = await prisma.$queryRaw`
            SELECT 
                p.id, 
                p.name, 
                p.description, 
                p.price, 
                p.seller_id,
                pr.name AS seller_name
            FROM product p
            JOIN profile pr ON p.seller_id = pr.id
            ORDER BY p.id DESC
            LIMIT 4;
        `;

        const formattedProducts = products.map((product) => ({
            ...product,
            price: Number(product.price),
        }));

        if (formattedProducts.length > 0) {
            res.status(200).json(formattedProducts);
        } else {
            res.status(404).send("No products found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while fetching products");
    }
};

export const searchProducts = async (req, res) => {
    const { query } = req.query;
    
    if (!query) {
        return res.status(400).json({ message: "Query parameter is required" });
    }

    try {
        const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: query, // Recherche insensible à la casse
                    mode: 'insensitive' // Permet une recherche insensible à la casse
                }
            }
        });
        
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
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

export const getProductsBySellerId = async (req, res) => {
    try {
        const { seller_id } = req.params;
        console.log("Requête reçue pour seller_id:", seller_id); // 🔥 Debug

        if (!seller_id) {
            return res.status(400).json({ error: "L'ID du vendeur est requis." });
        }

        // Vérifier si le vendeur existe (optionnel)
        const sellerExists = await prisma.profile.findUnique({
            where: { id: parseInt(seller_id) }
        });

        if (!sellerExists) {
            return res.status(404).json({ error: "Le vendeur n'existe pas." });
        }

        // ✅ Récupérer tous les produits associés au `seller_id`
        const products = await prisma.product.findMany({
            where: { seller_id: parseInt(seller_id) },
            orderBy: { id: "desc" } // Trier du plus récent au plus ancien
        });

        console.log("Produits récupérés :", products);

        if (products.length === 0) {
            return res.status(404).json({ message: "Aucun produit trouvé pour ce vendeur." });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        res.status(500).json({
            error: "Erreur serveur",
            details: error.message,
        });
    }
};
