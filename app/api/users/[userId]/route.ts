"use client"; // If you are using client components
import { NextApiRequest, NextApiResponse } from "next";
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {

    const { userId } = params;
    console.error("userId APP/USERS/[USERID]/ROUTE.TS:  ",userId)

    if (!userId || typeof userId !== 'string'){
        // return NextResponse.json({ error: "Invalid ID! app/users/[USERID]/ROUTE.TS"}, { status: 400 });
        return new Response(null, {status: 400});

    }

    try{

        const existingUser = await db.user.findUnique({
            where:{
                id: userId,
            },
        });

        if(!existingUser){
            console.log("EXISTING USER NOT FOUND. USERS/[USERID]/ROUTE.TS");
            // return NextResponse.json({ error: "USER not found. APP/USERS/[USERID]/ROUTE.TS"}, {status: 404});
            return new Response(null, { status: 404 });
        }
        console.log("EXITINGUSER USERS/[USERID]/ROUTE.TS:", existingUser)


        const followersCount = await db.user.count({
            where:{
                followingIds: {
                    has: userId,
                }
            }
        });

        // return new Response(JSON.stringify({existingUser, followersCount}), { status: 200 });
        // ;

        return new Response(JSON.stringify({ existingUser, followersCount }), { status: 200 });

    }catch(error){
        console.error("Error fetching user USERS/[USERID]/ROUTE.TS: ", error);
        // return NextResponse.json({ error: "Error in APP/USERS/[USERID]/ROUTE.TS"}, { status: 400 });
        return new Response(null, { status: 400 });
    }

};
