"use client";
import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";
import usePost from "@/hooks/usePost";
import Header from "@/components/Header";
import PostItem from "@/components/posts/PostItem";
import Form from "@/components/Form";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { usePathname } from 'next/navigation';
import CommentFeed from "@/components/posts/CommentFeed";


const PostView = () => {
    const pathname = usePathname();//CORRECT

    // console.log(pathname);
    const postId = pathname.split('/').pop();//CORRECT
    const { data: fetchedPost, isLoading } = usePost(postId); //CORRECT
    // console.log("fetchedPostttttttt PAGE.TSX [POSTID]:",fetchedPost);//CORRECT


    if (isLoading || !fetchedPost){
        return(
            <>
                <Header label="Tweet" showBackArrow/>
                <div className="flex justify-center items-center h-full">
                    <p className="text-white">Loading...</p>
                    <ClipLoader color="lightblue" size={80} />
                </div>
            </>
        );
    };

    return (
        <div>
            <Header label="Tweet" showBackArrow/>
            <PostItem data={fetchedPost} />
            <Form postId={postId as string} isComment placeholder="Tweet your reply" />
            <CommentFeed comments={fetchedPost?.comments}/>
        </div>
    )
}

export default PostView;