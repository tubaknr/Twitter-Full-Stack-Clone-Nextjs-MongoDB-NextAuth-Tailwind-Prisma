import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(req: NextRequest, res: NextResponse,  
                            // { params }: { params: {postId: string} }
                        ){
    try{
        const session = await getServerSession(authOptions);

        const currentUser = await db.user.findUnique({
            where:{
                email: session?.user?.email,
            },
        });

        const { body } = await req.json(); //CORRECT
        console.log("BODY BODYYYYYYYYYYY : ", req.body); //CORRECT

        const url = new URL(req.url);//CORRECT
        const postId = url.searchParams.get("postId"); //CORRECT
        if(!postId || typeof postId !== 'string'){
            throw new Error("There is no postId. COMMENTS.TS ");
        }


        // Create Comment
        const comment = await db.comment.create({
            data:{
                body,
                userId: currentUser?.id,
                postId,
            }
        });
        
        try{
            // Create Notification
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