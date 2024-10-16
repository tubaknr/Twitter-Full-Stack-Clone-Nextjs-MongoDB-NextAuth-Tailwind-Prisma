"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { formatDistanceToNowStrict } from "date-fns";
import { AiOutlineMessage, AiOutlineHeart } from "react-icons/ai";
import Avatar from "../Avatar";
import { useEffect } from 'react';
import useUser from "@/hooks/useUser"; 

interface PostItemProps {
    data: Record<string, any>;
    userId: string;
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
    
    const router = useRouter();
    const loginModal = useLoginModal();

    const { data: currentUser } = useCurrentUser();

    // console.log("currentUser POSTITEM.TS:", currentUser);
    // console.log("post data: ", data);
    // console.log("post data.body: ", data.body);
    // console.log("post data.id: ", data.id);
    // console.log("post data.user: ", data.user);
    
    // if (!data || !data.user) return;
    useEffect(() => {
        // Check if data and user id are defined
        if (data && data.user && data.user.id) {
            console.log(`User ID: ${data.user.id}`);
        } else {
            console.error("User data is not loaded or user id is missing.");
        }
    }, [data]);

    // go to user
    const goToUser = useCallback((event: any) => {
        event.stopPropagation();
        router.push(`/users/${data.user.id}`);
        // if (data?.user?.id) {
            // router.push(`/users/${data.user.id}`);
        // } else {
        //     // console.error("User data is not available.");
        // }
        // router.push(`/users/${data.user.id}`);
    },
    [router, data]);


    // go to post 
    const goToPost = useCallback(() => {
        router.push(`/posts/${data.id}`);
    }, 
    [router, data.id]);


    // on like 
    const onLike = useCallback((event: any) => {
        event.stopPropagation();
        loginModal.onOpen();
    }, [loginModal]);


    const createdAt = useMemo(() => {
        if(!data?.createdAt){
            return null;
        }
        return formatDistanceToNowStrict(new Date(data.createdAt));
    }, [data?.createdAt]);

    
    return(
        <>
            <div 
                onClick={goToPost}
                className="
                    border-b-[1px]
                    border-neutral-800
                    p-5
                    cursor-pointer
                    hover:bg-neutral-900
                    transition">
                    <div className="flex flex-row items-start gap-3">
                        <Avatar userId={data?.user?.id} />
                        <div>
                            <div className="flex flex-row items-center gap-2">
                                <p  onClick={goToUser}
                                    className="
                                        text-white
                                        font-semibold
                                        cursor-pointer
                                        hover:underline">
                                    {data?.user?.name}
                                </p>
                                <span onClick={goToUser} 
                                      className="
                                        text-neutral-500
                                        cursor-pointer
                                        hover:underline
                                        hidden
                                        md:block">
                                      @{data?.user?.username}
                                </span>

                                <span className="text-neutral-500 text-sm">
                                    {createdAt}
                                </span>
                            </div>

                            <div className="text-white mt-1 font-bold">
                                {data.body}
                            </div>

                            
                            <div className="flex flex-row items-center mt-3 gap-10">
                                <div className="
                                    flex
                                    flex-row
                                    items-center
                                    text-neutral-500
                                    gap-2
                                    cursor-pointer
                                    transition
                                    hover:text-sky-500">
                                    <AiOutlineMessage size={20}/>
                                    <p>
                                        {data.comments?.length || 0}
                                    </p>
                                </div>

                                <div    
                                    onClick={onLike} 
                                    className="
                                    flex
                                    flex-row
                                    items-center
                                    text-neutral-500
                                    gap-2
                                    cursor-pointer
                                    transition
                                    hover:text-red-500">
                                    <AiOutlineHeart size={20}/>
                                    <p>
                                        {data.comments?.length || 0}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

            </div>
        </>
    )
};

export default PostItem;
