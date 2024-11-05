import serverAuth from "@/lib/serverAuth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function PATCH(req: NextRequest){
    try{
        
        // get info from REQUEST
        const { name, username, bio, profileImage, coverImage } = await req.json();
        
        if (!name || !username){
            throw new Error("Missing fields");
        }
        
        //get current user
        // const authResult = await getCurrentUser();
        // if (!authResult){
            // return NextResponse.json({ error: "Current user not found. edit.ts" }, { status: 404 })
        // }
        // const currentUser = authResult;
        
        const session = await getServerSession(authOptions); //CORRECT
        if (!session) {
            return new Response("Unauthorized", { status: 403 })
        }
        const currentUser = session.user; //CORRECT        
        
        console.log("CURRENTUSER, EDİT.TS: ", currentUser);//CORRECT  
        

        // update the user
        const updatedUser = await db.user.update({
            where: {
                email: currentUser?.email
            },
            data: {
                name,
                username,
                bio,
                profileImage,
                coverImage
                }
            });

            // return the updatedUser as RESPONSE
            return NextResponse.json(updatedUser, { status: 200 });
 
    }catch(error){ // Bad Request
        console.log(error);
        return NextResponse.json({ error: "Failed to update user, edit.ts "}, { status: 400 });
    }
};


