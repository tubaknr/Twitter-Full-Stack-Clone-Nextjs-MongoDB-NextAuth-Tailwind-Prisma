import { getServerSession } from "next-auth";
import { prisma } from './db';
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { useSession, signIn, signOut } from "next-auth/react"
import { getSession } from "next-auth/react";

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
   
    // DENE:
    // const session = await getSession({req});
    // console.log("SESSION: LIB/SERVERAUTH.TS: ", session);

    // const session = await getServerSession(req, res, authOptions) //!!!!!!!!!!!!!!

      const headers = {
        "Content-Type": "application/json",
        // Cookie: allCookies,
      };

      const url = new URL(`/api/auth/session`, process.env.LOOPBACK_URL);
      
      
      try{
        const response = await fetch(url.href, {
                                        headers,
                                        cache: "no-store",
        });

        if (response.ok) {
          console.log("SESSION RESPONSE IS OK. SERVERAUTH");
          const session = await response.json();

          return NextResponse.next();
          }
      }catch(error){    
        console.log("UNAUTHORIZED! SERVERAUTH");    
        return new Response("Unauthorized", { status: 401 });
      }



    // if (!session || !session.user || !session.user.email){
    //     console.log("Session or user or email is not found. ServerAuth.");
    //     throw new Error("Session or user or email not found. serverAuth.ts");
    // }

    // const currentUser = await prisma.user.findUnique({
    //     where:{
    //         email: session.user.email,
    //     },
    // });

    // if (!currentUser){ 
    //     // throw new Error("CurrentUser not found in prismadb. serverAuth.ts");
    //     console.log("CurrentUser is not found. ServerAuth");
    //     return res.status(400).json({ error: "Current user not found. serverAuth.ts" });
    // }

    // console.log("CurrentUser is found. Returning user. ServerAuth.");

    // // const userWithoutPassword = exclude(currentUser, ["hashedPassword"]);
    // // // return NextResponse.json({ currentUser: userWithoutPassword }, { status: 200 });
    // // return userWithoutPassword;

    // // DENE:
    // return { currentUser };
};

export default serverAuth; 
