import { db } from "@/lib/db";
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){

    try{
        const {email, username, name, password} = await req.json();

        console.log("EMAİL RegisterModal.TS:", email);
        console.log("USERNAME RegisterModal.TS:", username);
        console.log("name RegisterModal.TS:", name);

        const hashedPassword = await bcrypt.hash(password, 12);

        console.log("password is hashed. Register.ts");

        const user = await db.user.create({
            data: {
                email, 
                username, 
                name, 
                hashedPassword 
            }
        });

        console.log("USER IS CREATED. user is returning. REGISTER.TS. USER: ", user);

        return NextResponse.json({user}, { status: 200 });

    }catch(error){
        console.log("Try error. Register.ts");
        return NextResponse.json({ error: "Error in register.ts "}, { status: 400 });
    }
}
