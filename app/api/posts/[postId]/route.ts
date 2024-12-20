import { NextApiResponse, NextApiRequest } from "next";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: {postId: string} }) {
    
    const { postId } = params; //CORRECT

    console.log("POSTID [POSTID]/ROUTES.TS: ", postId);//CORRECT

        if (!postId || typeof postId !== 'string'){
            // return NextResponse.json({ error: "Invalid ID! app/posts/[postId]/route.ts" }, { status: 400 });
            return new Response(null, { status: 400 });
        }

    try{
        // const { searchParams } = new URL(req.url);
        // const postId = searchParams.get("postId");

        const post = await db.post.findUnique({
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
            // return NextResponse.json({ error: "Post not found. APP/POSTS/[POSTID]/ROUTE.TS"}, {status: 404});
            return new Response(null, { status: 404 });
        }

        return new Response(JSON.stringify(post));
        
 
    }catch(error){
        console.log(error);
        // return NextResponse.json({ error: "Sth went wrong. APP/POSTS/[POSTID]/ROUTE.TS" }, { status: 400 })
        return new Response(null, { status: 500 });
    }
}
