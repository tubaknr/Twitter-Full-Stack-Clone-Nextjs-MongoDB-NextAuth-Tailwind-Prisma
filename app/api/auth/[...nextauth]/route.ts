"use client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/lib/prismaDb";
import NextAuth, { AuthOptions } from "next-auth";
import bcrypt from 'bcrypt';


export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentals',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    throw new Error(" Email and password required. ...Nextauth");
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if(!user || !user?.hashedPassword){
                    throw new Error("No user found. Invalid credentials. ...Nextauth");
                    
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if(!isCorrectPassword){
                    throw new Error("Invalid credentials. Passwords dont match. ...Nextauth");
                }

                return user;
            } 

        })
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/auth/signin',
    },
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }) {
          session.user.id = token.id;
          return session;
        },
        async jwt({ token, user }) {
          if (user) {
            token.id = user.id;
          }
          return token;
        },
      },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST};
