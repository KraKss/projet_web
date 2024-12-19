import prisma from "../../database/databseORM.js";

export const readClientByEmail = async (email) => {
    return prisma.profile.findUnique({
        where: {
            email: email,
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true
        },
    });
};
