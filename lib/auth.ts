import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";
import NextAuth, { NextAuthOptions } from "next-auth";
import bcrypt from 'bcrypt';
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db as any),
    session: {
        strategy: 'jwt',
    },  
    pages: {
        signIn: "/",
    },
    providers: [
        CredentialsProvider({
            // id: 'credentials',
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

                const user = await db.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if(!user || !user?.hashedPassword){
                    console.log("No user found. Invalid credentials. ...Nextauth");
                    throw new Error("No user found. Invalid credentials. ...Nextauth");
                    
                }

                console.log("User FOUNDDDDDD. Password s checking... NextAuth.");

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
    debug: process.env.NODE_ENV === 'development' || true,  
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    callbacks: {
        async session({ token, session }) {
          if (token) {
            session.user.id = token.id
            session.user.name = token.name
            session.user.email = token.email
        }
    
          return session
        },
        async jwt({ token, user }) {
          const dbUser = await db.user.findFirst({
            where: {
              email: token.email,
            },
          })
    
          if (!dbUser) {
            if (user) {
              token.id = user?.id
            }
            return token
          }
    
          return {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            picture: dbUser.image,
          }
        }
    }
};

