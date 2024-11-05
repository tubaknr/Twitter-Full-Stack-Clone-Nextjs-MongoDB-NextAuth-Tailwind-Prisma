import serverAuth from "@/lib/serverAuth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
// prisma -> interact with db
// serverAuth -> authenticate users


// SERVER SIDE API ROUTE Follow.ts
async function handleFollowUnfollow(req: Request, method: string) {

    // follow -> POST
    // unfollow -> DELETE


    try{
        // fetch the user by userId ( user wants to follow or unfollow)
        // extract userId from request query pms.
        // this is the ID of the user you want to follow or unfollow!!!!!
        // const { userId } = req.query;
        // const { userId } = await req.json();

        // follow yada unfollow ETMEK İSTEYEN KULLANICI
        const authResult = await getCurrentUser();

        if (!authResult){
            return NextResponse.json({ error: "Current user not found. follow.ts" }, { status: 404 })
        }

        const currentUser = authResult;
        const userId = currentUser?.id;
        console.log("CURRENTUSER, FOLLOW.TS: ", currentUser);


        if (!userId || typeof userId !== "string"){
            throw new Error("User ID is not found FOLLOW.TS");
        }

        // follow EDİLMEK İSTENEN KULLANICI
        const user = await db.user.findUnique({
            where: {
                id: userId, 
            },
        });

        if (!user){
            throw new Error("There is no user with this ID. Invalid ID. FOLLOW.TS");
        }

        // A new array updatedFollowingIds is created by copying the current followingIds
        let updatedFollowingIds = [...(currentUser.followingIds || [])];
        
        // follow edilecekse
        // userId'yi following listesine ekle
        if(method === "POST"){
            updatedFollowingIds.push(userId); //takip etmek istenilen ID.

            try{

                await db.notification.create({
                    data: {
                        body: 'Someone followed you!',
                        userId,
                    }
                });

                await db.user.update({
                    where: {
                        id: userId,
                    },
                    data: {
                        hasNotification: true,
                    },
                });

            }catch(error){
                console.log(error);
            }
        }

        // unfollow edilecekse
        // remove the userId from the list
        if(method === "DELETE"){
            updatedFollowingIds = updatedFollowingIds.filter(followingId => followingId !== userId);
        }

        // follow / unfollow etmek İSTEYEN KULLANCIIYI GÜNCELLE
        const updatedUser = await db.user.update({
            where: {
                id: currentUser.id,
            },
            data: {
                followingIds: updatedFollowingIds, //takip ettiği liste
            }
        });

        return NextResponse.json(updatedUser, { status: 200 });

    }catch(error){
        console.log(error);
        return NextResponse.json({ error: "Sth went wrong. Follow.ts" }, { status: 400 });
    }
    
}


export async function POST(req: Request) {
    return handleFollowUnfollow(req, "POST");
}

export async function DELETE(req: Request) {
    return handleFollowUnfollow(req, "DELETE");
}
