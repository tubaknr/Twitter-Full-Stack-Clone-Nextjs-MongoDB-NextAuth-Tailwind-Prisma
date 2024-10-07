import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

const serverAuth = async(req: NextApiRequest){
   
    const session = getSession({ req });

    if (!session?.user?.email){
        throw new Error("Session or user or email not found. serverAuth.ts");
    }

    const currentUser = await prisma?.user.findUnique({
        where:{
            email: session.user.email,
        },
    });

    if (!currentUser){
        throw new Error("CurrentUser not found in prismadb. serverAuth.ts");
    }

    return {currentUser};
};

export default serverAuth; 
