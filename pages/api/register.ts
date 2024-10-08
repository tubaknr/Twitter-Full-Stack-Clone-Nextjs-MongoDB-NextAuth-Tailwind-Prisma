import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method !== "POST"){
        console.log("Method is not POST. Register.ts")
        return res.status(405).end();
    }

    try{
        const {email, username, name, password} = req.body;

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email, username, name, hashedPassword 
            }
        });

        return res.status(200).json(user);

    }catch(error){
        console.log("Try error. Register.ts");
        return res.status(400).end();
    }
}
