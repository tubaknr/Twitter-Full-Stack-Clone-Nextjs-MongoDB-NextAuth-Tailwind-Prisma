import { db } from "@/lib/db";
import serverAuth from "@/lib/serverAuth";
import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {

    try{
        const session = await getServerSession(authOptions);

        if (!session) {
            return new Response("Unauthorized", { status: 403 })
        }
        const { user } = session;

        const { body } = await req.json(); //BODY

        const posts = await db.post.create({
            data: {
                body: body,
                userId: user?.id,
            }
        }) ;

        return new Response(JSON.stringify(posts));
        }
        catch(error){
            // return NextResponse.json({ error: "Sth went wrong. app/posts/route.ts i POST req. "}, { status: 400 });
            return new Response(null, { status: 500 });
        }
    }


export async function DELETE(req: NextRequest) {
            
    try{
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        let posts;

        if(userId && typeof userId === "string"){
            posts = await db.post.findMany({
                where: {
                    userId: userId, //userID. o user'ın yazdığı postlar.
                },
                include: {
                    user: true,
                    comments: true,
                },
                orderBy: {
                    createdAt: 'desc',
                }
            });
        }else{
            posts = await db.post.findMany({
                include: {
                    user: true,
                    comments: true,
                },
                orderBy: {
                    createdAt: 'desc',
                }
            });
        }
        return new Response(JSON.stringify(posts));

    }
        catch(error){
            console.log(error, " : posts/route.ts");
            // return NextResponse.json({ error: "Failed to fetch posts. APP/POSTS/ROUTE.TS" }, { status: 400 });
            return new Response(null, { status: 500 });
        }
    }

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        let posts;

        if (userId && typeof userId === "string") {
            posts = await db.post.findMany({
                where: {
                    userId: userId,
                },
                include: {
                    user: true,
                    comments: true,
                },
                orderBy: {
                    createdAt: 'desc',
                }
            });
        } else {
            posts = await db.post.findMany({
                include: {
                    user: true,
                    comments: true,
                },
                orderBy: {
                    createdAt: 'desc',
                }
            });
        }

        return new Response(JSON.stringify(posts));
        
    } catch (error) {
        console.error(error, " : posts/route.ts");
        // return NextResponse.json({ error: "Failed to fetch posts. APP/POSTS/ROUTE.TS" }, { status: 400 });
        return new Response(null, { status: 500 });
    }
}