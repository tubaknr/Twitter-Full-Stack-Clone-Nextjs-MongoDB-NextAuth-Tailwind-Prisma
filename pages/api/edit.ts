import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res:NextApiResponse){

    if (req.method !== "PATCH") {
        return res.status(405).end();
    }

    try{
        //get current user
        const { currentUser } = await serverAuth(req, res);

        // get info from REQUEST
        const { name, username, bio, profileImage, coverImage } = req.body;

        if (!name || !username){
            throw new Error("Missing fields");
        }

        // update the user
        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name,
                username,
                bio,
                profileImage,
                coverImage
                }
            });

            // return the updatedUser as RESPONSE
            return res.status(200).json(updatedUser);
 
    }catch(error){
        console.log(error);
        return res.status(400).end();
    }
}





