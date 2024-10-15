"use client";
import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";


interface PostFeedProps{
    userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
    
    const { data: posts = [] } = usePosts(userId);
    console.log("userId POSTFEEDDDD:", userId)
    console.log("POSTSSSSSSSSSSS:",posts);

    if (posts.lengh === 0){
        return(
            <p className="text-white">No posts available.</p>
        )
    }
    
    return(
        <>
        {posts.map((post: Record<string, any>) => (
            <PostItem 
                userId={userId}
                key={post.id}
                data={post}/>
        ))}
        </>
    )
};

export default PostFeed;
