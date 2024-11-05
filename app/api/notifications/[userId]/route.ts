import { NextApiRequest, NextApiResponse } from "next";
import { db } from '@/lib/db';
import { getCurrentUser } from "@/lib/session";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    if(req.method !== "GET"){
        return res.status(405).end();
    }
    try{
        // console.log("REQQQQQ:",req);
        // const { userId } = req.query;
        // console.log("NOTIFICATIONS/[USERID] : req.query: ",req.query);

        const currentUser = await getCurrentUser();
        const userId = currentUser.id;

        if(!userId || typeof userId !== 'string'){
            throw new Error("Invalid ID");
        }

        const notifications = await db.notifications.findMany({
            where:{
                userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        await db.user.update({
            where: {
                id: userId,
            },
            data: {
                hasNotification: false,
            },
        });

        return res.status(200).json(notifications);

    }catch(error){
        console.log(error);
        return res.status(400).end();
    }
}
