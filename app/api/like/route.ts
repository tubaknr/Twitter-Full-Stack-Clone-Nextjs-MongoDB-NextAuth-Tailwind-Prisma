import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/lib/serverAuth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

async function handleLike(req: Request, method: string){

    try{
        const { postId } = await req.json();
        console.log("POSTID: LIKE.TS: ", postId);

        const authResult = await getCurrentUser();

        if (!authResult || !authResult.currentUser){
            return NextResponse.json({ error: "Current user not found. like.ts" }, { status: 404 })
        }

        const currentUser = authResult;
        console.log("CURRENTUSER, LIKE.TS: ", currentUser);
        
        if (!postId || typeof postId!=="string"){
            throw new Error("Invalid ID LIKE.TS");
        }

        const post = await db.post.findUnique({
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
            
            try{
               const post = await db.post.findUnique({
                where:{
                    id: postId,
                }
               });

               if(post?.userId){
                    await db.notification.create({
                        data:{
                            body: 'Someone liked your tweet!',
                            userId: post.userId,
                        },
                    });

                    await db.user.update({
                        where:{
                            id: post.userId,
                        },
                        data: {
                            hasNotification: true,
                        },
                    });
               } 

            }catch(error){
                console.log(error);
            }

            console.log("updatedLikedIds: LİKE.TS", updatedLikedIds);
        }

        if (method === "DELETE"){
            updatedLikedIds = updatedLikedIds.filter((likedId) => likedId !== currentUser.id);
        }

        const updatedPost = await db.post.update({
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
