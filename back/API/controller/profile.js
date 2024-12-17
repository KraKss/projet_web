
import prisma from "../../database/databseORM.js";

export const getProfile = async (req, res)=> {
    try {
        const profile = await prisma.profile.findUnique({
            where: {
                id: Number(req.params.id),
            }
        });
        if(profile){
            res.send(profile);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};