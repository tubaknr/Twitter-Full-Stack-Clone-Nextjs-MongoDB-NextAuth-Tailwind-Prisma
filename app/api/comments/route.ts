import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";

export async function POST(req: NextApiRequest, res: NextResponse){
    try{
        const currentUser = getCurrentUser();
        const { body } = req.body;
        const { postId } = req.query; 
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
        })

        return NextResponse.json(comment, { status: 200 });
    }catch(error){
        console.log("ERROR: COMMENT.TS: ", error);
        return NextResponse.json({ error: "Comment.ts file has an error!!!!!" }, { status: 400 });
    }
}