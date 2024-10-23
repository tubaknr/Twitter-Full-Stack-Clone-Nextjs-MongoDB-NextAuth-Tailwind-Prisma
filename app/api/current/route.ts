import serverAuth from "@/app/api/auth/[...nextauth]/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res:NextApiResponse) {

    try{
        const authResult = await serverAuth(req, res);

        if (!authResult){
            return NextResponse.json({ error: "Current user not found. current.ts" }, { status: 404 })
        }

        const { currentUser } = authResult;
        console.log("CURRENTUSER, CURRENT.TS: ", currentUser);

        return NextResponse.json({currentUser}, { status: 200 });

    }
    catch(error){
        console.log(error);
        return NextResponse.json({ error: "Sth went wrong. current.ts "}, { status: 400 });
    }

}