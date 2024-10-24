import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/app/api/auth/[...nextauth]/serverAuth";
import prisma from "@/app/lib/prismaDb";
import { NextResponse } from "next/server";

async function handleLike(req: Request, method: string){

    try{
        const { postId } = await req.json();
        console.log("POSTID: LIKE.TS: ", postId);

        const authResult = await serverAuth(req);

        if (!authResult || !authResult.currentUser){
            return NextResponse.json({ error: "Current user not found. like.ts" }, { status: 404 })
        }

        const { currentUser } = authResult;
        console.log("CURRENTUSER, LIKE.TS: ", currentUser);
        
        if (!postId || typeof postId!=="string"){
            throw new Error("Invalid ID LIKE.TS");
        }

        const post = await prisma.post.findUnique({
            where:
            {
                id: postId,
            }
        });

        if(!post){
            throw new Error("Post not found. like.ts");
        }

        let updatedLikedIds = [...(post.likedIds || [])];
        
        if (method === "POST"){
            updatedLikedIds.push(currentUser.id);
            console.log("updatedLikedIds: LİKE.TS", updatedLikedIds);
        }

        if (method === "DELETE"){
            updatedLikedIds = updatedLikedIds.filter((likedId) => likedId !== currentUser.id);
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                likedIds: updatedLikedIds,
            }
        });

        return NextResponse.json(updatedPost, { status: 200 });
 
    }catch(error){
        console.log(error);
        return NextResponse.json({ error: " Sth went wrong. LIKE.TS" }, { status: 400 });
    }
}

export async function POST(req: Request) {
    return handleLike(req, "POST");
}

export async function DELETE(req: Request) {
    return handleLike(req, "DELETE");
}
