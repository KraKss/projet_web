import prisma from "../../database/databseORM.js";

export const readManager = async (email) => {
    return prisma.manager.findUnique({
        where: {
            email: email,
        },
    });
};
