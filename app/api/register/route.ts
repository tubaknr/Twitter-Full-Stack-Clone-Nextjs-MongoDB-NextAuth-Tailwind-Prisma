import prisma from "@/app/lib/prismaDb";
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){

    try{
        const {email, username, name, password} = await req.json();

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email, 
                username, 
                name, 
                hashedPassword 
            }
        });

        return NextResponse.json({user}, { status: 200 });

    }catch(error){
        console.log("Try error. Register.ts");
        return NextResponse.json({ error: "Error in register.ts "}, { status: 400 });
    }
}
