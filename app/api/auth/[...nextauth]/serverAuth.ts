import { getServerSession } from "next-auth";
import prisma from '../../../lib/prismaDb';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

function exclude<User, Key extends keyof User>(
    user: User,
    keys: Key[]
  ): Omit<User, Key> {
    for (let key of keys) {
      delete user[key];
    }
    return user;
  }

  // şu anki giriş yapmış olan kullanıcı
  export const serverAuth = async(req: NextApiRequest, res: NextApiResponse) => {
   
    const session = await getServerSession(req, res, authOptions);
    console.log("Session Data: SERVERAUTH.ts ", session);

    if (!session || !session.user || !session.user.email){
        throw new Error("Session or user or email not found. serverAuth.ts");
    }

    const currentUser = await prisma.user.findUnique({
        where:{
            email: session.user.email,
        },
    });

    if (!currentUser){
        // throw new Error("CurrentUser not found in prismadb. serverAuth.ts");
        return NextResponse.json({ error: "Current user not found. serverAuth.ts" }, { status: 404 });
    }

    const userWithoutPassword = exclude(currentUser, ["hashedPassword"]);
    // return NextResponse.json({ currentUser: userWithoutPassword }, { status: 200 });
    return userWithoutPassword;
};

export default serverAuth; 
