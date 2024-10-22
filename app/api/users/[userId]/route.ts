"use client"; // If you are using client components
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/app/lib/prismaDb';
import { NextRequest, NextResponse } from "next/server";

import { useRouter } from 'next/router';
export async function GET(req: NextRequest) {

    try{
    //     const router = useRouter();
    //     const { userId } = router.query; 
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        console.log("userId APP/USERS/[USERID]/ROUTE.TS:  ",userId)

        if (!userId || typeof userId !== 'string'){
            throw new Error("Invalid ID! app/users/[USERID]/ROUTE.TS");
        }

        const existingUser = await prisma.user.findUnique({
            where:
            {
                id: userId,
            }
        });

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
