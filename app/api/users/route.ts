import { NextApiRequest, NextApiResponse } from "next";
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  
    try{
        const users = await db.user.findMany({
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