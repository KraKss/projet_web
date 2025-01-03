import {profileSchema} from "../middleware/validator/profile.js";
import {hash} from "../../utils/hash.js";
import {sign} from "../../utils/jwt.js";
import prisma from "../../database/databseORM.js";

export const createAccount = async (req, res) => {
    try {
        const { name, email, password, address, bank_account, balance } = req.body;

        // Validation des données d'entrée
        const validatedBody = profileSchema.parse({
            name, email, password, address, bank_account, balance
        });

        // Hachage du mot de passe
        const hashedPassword = await hash(password, 10);

        // Création de l'utilisateur
        const user = await prisma.profile.create({
            data: {
                ...validatedBody,
                password: hashedPassword,
            },
        });

        // Génération du JWT
        const token = sign(
            {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            { expiresIn: "8h" }
        );

        // Retourner le token
        res.status(201).json({
            token,
            user,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            error: "Une erreur est survenue lors de la création du compte.",
            details: e.message,
        });
    }
};
