import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../pages/auth/[...nextauth]";
import { getCurrentUser } from "@/lib/session";

export async function GET(req: NextRequest, res:NextResponse) {

    const currentUser = await getCurrentUser();
    console.log("Serverauth CurentUser'ı döndü. CURRENTUSER FOUND., CURRENT.TS: ", currentUser);
    
    try{
        console.log("Returning currentUser CURRENT.TS");
        return NextResponse.json(currentUser, {status: 200});

    }
    catch(error){
        console.log("ERROR CURRENT.TS: ", error);
        return NextResponse.json({ error: "Sth went wrong. current.ts "}, {status: 404});
    }

}
