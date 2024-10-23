import serverAuth from "@/app/api/auth/[...nextauth]/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest, res:NextResponse) {

    const authResult = await serverAuth(req, res, authOptions);
    console.log("authResult:",authResult);

    if (!authResult){
        return NextResponse.json({ error: "Current user not found. current.ts" }, { status: 404 })
    }

    const { currentUser } = authResult;
    console.log("CURRENTUSER, CURRENT.TS: ", currentUser);
    
    try{
        return NextResponse.json({currentUser, authResult}, { status: 200 });

    }
    catch(error){
        console.log(error);
        return NextResponse.json({ error: "Sth went wrong. current.ts "}, { status: 400 });
    }

}
