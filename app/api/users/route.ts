import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/app/lib/prismaDb';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  
    try{
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc' //en yeni kaydolan kullanıcı en yukarıda
            }
        });

        return NextResponse.json(users, {status: 200});

    }catch(error){
        console.log(error);
        return NextResponse.json({ error: "Error in APP/USERS/ROUTE.TS"}, { status: 400 });
    }
}