import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";
import { NextResponse } from "next/server";

export async function getCurrentUser(){
    const session = await getServerSession(authOptions)

    if(!session){
        return NextResponse.json({error: "Session NOT FUND. SESSION.TS"}, {status: 404});
    }
    return NextResponse.json(session?.user, {status: 200});
}