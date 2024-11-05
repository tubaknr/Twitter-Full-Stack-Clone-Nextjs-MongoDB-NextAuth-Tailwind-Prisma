import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";

export async function POST(req: NextRequest, res: NextResponse,  { params }: { params: {postId: string} }){
    try{
        const currentUser = getCurrentUser();
        const { body } = req.body;
        console.log("BODY : ", req.body);
        // const { postId } = req.query; 

            
        const { postId } = params; 
        console.log("POSTID [POSTID]/ROUTES.TS: ", postId);


        // GELEN URL = "/api/comments?postId=" + postId

        if(!postId || typeof postId !== 'string'){
            throw new Error("There is no postId. COMMENTS.TS ");
        }

        const comment = await db.comment.create({
            data:{
                body,
                userId: currentUser.id,
                postId,
            }
        });
        
        try{
            const post = await db.post.findUnique({
             where:{
                 id: postId,
             }
            });

            if(post?.userId){
                 await db.notification.create({
                     data:{
                         body: 'Someone replied to your tweet!',
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


        return NextResponse.json(comment, { status: 200 });
    }catch(error){
        console.log("ERROR: COMMENT.TS: ", error);
        return NextResponse.json({ error: "Comment.ts file has an error!!!!!" }, { status: 400 });
    }
    }catch(error){
        console.log("API COMMENTS ERROR: ", error);
    }
};

