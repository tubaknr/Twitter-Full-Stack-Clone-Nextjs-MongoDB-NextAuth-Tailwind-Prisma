import prisma from "@/app/lib/prismaDb";
import serverAuth from "@/app/api/auth/[...nextauth]/serverAuth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try{
        const { currentUser } = await serverAuth(req);
        
        const { body } = await req.json(); //BODY

        const post = await prisma.post.create({
            data: {
                body: body,
                userId: currentUser.id,
            }
        }) ;

        return NextResponse.json(post);
        }
        catch(error){
            return NextResponse.json({ error: "Sth went wrong. app/posts/route.ts i POST req. "}, { status: 400 });
        }
    }


export async function DELETE(req: NextRequest) {
            
    try{
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        let posts;

        if(userId && typeof userId === "string"){
            posts = await prisma.post.findMany({
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
            posts = await prisma.post.findMany({
                include: {
                    user: true,
                    comments: true,
                },
                orderBy: {
                    createdAt: 'desc',
                }
            });
        }
        return NextResponse.json(posts);

    }
        catch(error){
            console.log(error, " : posts/route.ts");
            return NextResponse.json({ error: "Failed to fetch posts. APP/POSTS/ROUTE.TS" }, { status: 400 });
        }
    }

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        let posts;

        if (userId && typeof userId === "string") {
            posts = await prisma.post.findMany({
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
            posts = await prisma.post.findMany({
                include: {
                    user: true,
                    comments: true,
                },
                orderBy: {
                    createdAt: 'desc',
                }
            });
        }

        return NextResponse.json(posts);
    } catch (error) {
        console.error(error, " : posts/route.ts");
        return NextResponse.json({ error: "Failed to fetch posts. APP/POSTS/ROUTE.TS" }, { status: 400 });
    }
}