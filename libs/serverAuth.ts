import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from '@/libs/prismadb';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

function exclude<User, Key extends keyof User>(
    user: User,
    keys: Key[]
  ): Omit<User, Key> {
    for (let key of keys) {
      delete user[key];
    }
    return user;
  }

  const serverAuth = async(req: NextApiRequest, res:NextApiResponse) => {
   
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email){
        throw new Error("Session or user or email not found. serverAuth.ts");
    }

    const currentUser = await prisma.user.findUnique({
        where:{
            email: session.user.email,
        },
    });

    if (!currentUser){
        throw new Error("CurrentUser not found in prismadb. serverAuth.ts");
    }

    const userWithoutPassword = exclude(currentUser, ["hashedPassword"]);
    return { currentUser: userWithoutPassword };
};

export default serverAuth; 
