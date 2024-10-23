"use client"; // If you are using client components
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/app/lib/prismaDb';
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
    
    const { userId } = params;
    console.error("userId APP/USERS/[USERID]/ROUTE.TS:  ",userId)

    if (!userId || typeof userId !== 'string'){
        return NextResponse.json({ error: "Invalid ID! app/users/[USERID]/ROUTE.TS"}, { status: 400 });
    }

    try{

        const existingUser = await prisma.user.findUnique({
            where:{
                id: userId,
            },
        });

        if(!existingUser){
            console.log("EXISTING USER NOT FOUND. USERS/[USERID]/ROUTE.TS");
            return NextResponse.json({ error: "USER not found. APP/USERS/[USERID]/ROUTE.TS"}, {status: 404});
        }
        console.log("EXITINGUSER USERS/[USERID]/ROUTE.TS:", existingUser)

        
        const followersCount = await prisma.user.count({
            where:{
                followingIds: {
                    has: userId,
                }
            }
        });

        return NextResponse.json({ ...existingUser, followersCount}, { status: 200 }
        );

    }catch(error){
        console.error("Error fetching user USERS/[USERID]/ROUTE.TS: ", error);
        return NextResponse.json({ error: "Error in APP/USERS/[USERID]/ROUTE.TS"}, { status: 400 });
    }
    
};
