import serverAuth from "@/app/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextApiRequest, res:NextApiResponse) {

    const authResult = await serverAuth(req, res);
    console.log("authResult CURRENT.TS: ",authResult);

    if (!authResult){
        console.log("Current not found. CURRENT.TS");
        return res.status(404).json({ error: "Current user not found. current.ts" })
    }

    const { currentUser } = authResult;
    console.log("Serverauth CurentUser'ı döndü. CURRENTUSER FOUND., CURRENT.TS: ", currentUser);
    
    try{
        console.log("Returning currentUser CURRENT.TS");
        return res.status(200).json(currentUser);

    }
    catch(error){
        console.log("ERROR CURRENT.TS: ", error);
        return res.status(400).json({ error: "Sth went wrong. current.ts "});
    }

}
