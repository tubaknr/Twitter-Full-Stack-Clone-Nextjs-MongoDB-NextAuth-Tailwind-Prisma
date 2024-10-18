"use client";
import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";
import usePost from "@/hooks/usePost";
import Header from "@/components/Header";
import PostItem from "@/components/posts/PostItem";

const PostView = () => {

    const { postId } = useParams();
    console.log(postId)
    const { data: fetchedPost, isLoading } = usePost(postId as string);
    console.log("fetchedPost:",fetchedPost);

    if (isLoading || !fetchedPost){
        return(
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80} />
            </div>
        );
    };

    return (
        <div>
            <Header label="Tweet" showBackArrow/>
            <PostItem data={fetchedPost} />
        </div>
    )
}

export default PostView;