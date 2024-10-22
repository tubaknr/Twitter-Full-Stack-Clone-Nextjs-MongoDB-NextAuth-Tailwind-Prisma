"use client";
import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";
import usePost from "@/app/hooks/usePost";
import Header from "@/app/components/Header";
import PostItem from "@/app/components/posts/PostItem";
import Form from "@/app/components/Form";

const PostView = () => {

    const { postId } = useParams();
    console.log("postId PAGE.TSX:", postId);

    const { data: fetchedPost, isLoading } = usePost(postId as string); //!!!!
    console.log("fetchedPost PAGE.TSX [POSTID]:",fetchedPost);

    if (isLoading || !fetchedPost){
        return(
            
            <div className="flex justify-center items-center h-full">
                <p className="text-white">Loading Post [postId]/page.tsxt</p>
                <ClipLoader color="lightblue" size={80} />
            </div>
        );
    };

    return (
        <div>
            <Header label="Tweet" showBackArrow/>
            <PostItem data={fetchedPost} />
            <Form postId={postId as string} isComment placeholder="Tweet your reply" />
        </div>
    )
}

export default PostView;