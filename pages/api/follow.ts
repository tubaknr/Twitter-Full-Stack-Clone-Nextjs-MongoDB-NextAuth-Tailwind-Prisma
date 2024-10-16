import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
// prisma -> interact with db
// serverAuth -> authenticate users


// SERVER SIDE API ROUTE Follow.ts
export default async function handler(req:NextApiRequest, res:NextApiResponse) {

    // follow -> POST
    // unfollow -> DELETE
    if(req.method !== "POST" && req.method !== "DELETE"){
        return res.status(405).end();
    }

    try{
        // fetch the user by userId ( user wants to follow or unfollow)
        // extract userId from request query pms.
        // this is the ID of the user you want to follow or unfollow!!!!!
        // const { userId } = req.query;
        const userId = req.headers["user-id"];
        

        // follow yada unfollow ETMEK İSTEYEN KULLANICI
        const { currentUser } = await serverAuth(req, res);

        if (!userId || typeof userId !== "string"){
            throw new Error("Usser ID is not found FOLLOW.TS");
        }

        // follow EDİLMEK İSTENEN KULLANICI
        const user = await prisma.user.findUnique({
            where: {
                id: userId, 
            },
        });

        if (!user){
            throw new Error("There is no user with this ID. Invalid ID. FOLLOW.TS");
        }

        // A new array updatedFollowingIds is created by copying the current followingIds
        let updatedFollowingIds = [...(user.followingIds || [])];
        
        // follow edilecekse
        // userId'yi following listesine ekle
        if(req.method === "POST"){
            console.log("POSTTAYIZZZZ")
            updatedFollowingIds.push(userId); //takip etmek istenilen ID.
        }

        // unfollow edilecekse
        // remove the userId from the list
        if(req.method === "DELETE"){
            updatedFollowingIds = updatedFollowingIds.filter(followingId => followingId !== userId);
        }

        // follow / unfollow etmek İSTEYEN KULLANCIIYI GÜNCELLE
        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                followingIds: updatedFollowingIds, //takip ettiği liste
            }
        });

        return res.status(200).json(updatedUser);

    }catch(error){
        console.log(error);
        return res.status(400).end();
    }
    
}