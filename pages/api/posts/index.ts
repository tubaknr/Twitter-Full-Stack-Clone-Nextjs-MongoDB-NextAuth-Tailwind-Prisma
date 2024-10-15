import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    
    if(req.method !== "GET" && req.method!=="POST"){
        res.status(405).end();
    }
    try{
        // POST
        if(req.method === "POST"){
            const { currentUser } = await serverAuth(req, res);
            const { body } = req.body //BODY

            const post = await prisma.post.create({
                data: {
                    body: body,
                    userId: currentUser.id,
                }
            }) ;

            return res.status(200).json(post);
        }


        // GET
        else if(req.method === "GET"){

            const { userId } = req.query; //QUERY
            
            let posts;
            
            if(userId && typeof userId === "string"){
                posts = await prisma.post.findMany({
                    where: {
                        id: userId,
                    },
                    include: {
                        user: true,
                        comments: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    }
                });

            }else{
                posts = await prisma.post.findMany({
                    include: {
                        user: true,
                        comments: true,
                    },
                    orderBy: {
                        createdAt: 'desc',
                    }
                });
            }
            return res.status(200).json(posts);
        }

    }
    catch(error){
        console.log(error);
        return res.status(400).end();
    }
    
}

