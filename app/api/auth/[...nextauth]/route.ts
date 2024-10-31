"use client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/app/lib/prismaDb";
import NextAuth, { NextAuthOptions } from "next-auth";
import bcrypt from 'bcrypt';
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentals',
            credentials: {
                email: { 
                    label: 'email', 
                    type: 'text' 
                },
                password: { 
                    label: 'password', 
                    type: 'password' 
                },
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    console.log(" Email and password required. ...Nextauth");
                    throw new Error(" Email and password required. ...Nextauth");
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if(!user || !user?.hashedPassword){
                    console.log("No user found. Invalid credentials. ...Nextauth");
                    throw new Error("No user found. Invalid credentials. ...Nextauth");
                    
                }

                console.log("User found. Password s checking... NextAuth.");

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if(!isCorrectPassword){
                    console.log("Invalid credentials. Passwords dont match. ...Nextauth");
                    throw new Error("Invalid credentials. Passwords dont match. ...Nextauth");
                }

                console.log("Passwords matched. Successfull. User is returng. NextAuth.");
                
                return user;
            } 

        })
    ],//end of providers array
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },    
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
};

// export default NextAuth(authOptions);

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST};