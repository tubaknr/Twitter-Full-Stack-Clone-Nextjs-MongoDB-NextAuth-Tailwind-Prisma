import serverAuth from "@/app/lib/serverAuth";
import prisma from "@/app/lib/prismaDb";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest){
    try{
        
        // get info from REQUEST
        const { name, username, bio, profileImage, coverImage } = await req.json();
        
        if (!name || !username){
            throw new Error("Missing fields");
        }
        
        //get current user
        const authResult = await serverAuth(req);

        if (!authResult || !authResult.currentUser){
            return NextResponse.json({ error: "Current user not found. edit.ts" }, { status: 404 })
        }

        const { currentUser } = authResult;
        console.log("CURRENTUSER, EDİT.TS: ", currentUser);
        

        // update the user
        const updatedUser = await prisma.user.update({
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


