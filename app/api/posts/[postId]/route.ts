import { NextApiResponse, NextApiRequest } from "next";
import prisma from "@/app/lib/prismaDb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    
    try{
        const { searchParams } = new URL(req.url);
        const postId = searchParams.get("postId");

        if (!postId || typeof postId !== 'string'){
            throw new Error("Invalid ID! app/posts/[POSTID].TS");
        }

        const post = await prisma.post.findUnique({
            where:{
                id: postId,
            },
            include: {
                user: true,
                comments: {
                    include: {
                        user: true,
                    },
                    orderBy: {
                        createdAt: 'desc'
                    },
                },
            },
        });


        if (!post){
            return NextResponse.json({ error: "Post not found. APP/POSTS/[POSTID]/ROUTE.TS"}, {status: 404});
        }

        return NextResponse.json(post, { status: 200 });
        
 
    }catch(error){
        console.log(error);
        return NextResponse.json({ error: "Sth went wrong. APP/POSTS/[POSTID]/ROUTE.TS" }, { status: 400 })
    }
}
