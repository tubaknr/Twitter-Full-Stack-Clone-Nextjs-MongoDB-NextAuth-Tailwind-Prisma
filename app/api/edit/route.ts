import serverAuth from "@/lib/serverAuth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

export async function PATCH(req: NextRequest){
    try{
        
        // get info from REQUEST
        const { name, username, bio, profileImage, coverImage } = await req.json();
        
        if (!name || !username){
            throw new Error("Missing fields");
        }
        
        //get current user
        const authResult = await getCurrentUser();

        if (!authResult || !authResult.currentUser){
            return NextResponse.json({ error: "Current user not found. edit.ts" }, { status: 404 })
        }

        const currentUser = authResult;
        console.log("CURRENTUSER, EDİT.TS: ", currentUser);
        

        // update the user
        const updatedUser = await db.user.update({
            where: {
                id: currentUser.id
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
 
    }catch(error){
        console.log(error);
        return NextResponse.json({ error: "Failed to update user, edit.ts "}, { status: 400 });
    }
};


