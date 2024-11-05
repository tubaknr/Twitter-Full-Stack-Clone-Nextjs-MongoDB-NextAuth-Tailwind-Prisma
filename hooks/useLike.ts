import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import usePosts from "./usePosts";
import usePost from "./usePost";
import { useCallback, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useLike = ({ postId, userId } : { postId: string, userId?:string }) => {
    // console.log("postId USELIKE.TS:", postId);//CORRECT

    const { data: currentUser } = useCurrentUser();
    
    // o postu update et
    const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);

    // o user ın postlarını update et
    const { mutate: mutateFetchedPosts } = usePosts(userId);

    const loginModal = useLoginModal();

    const hasLiked = useMemo(() => {
        const list = fetchedPost?.likedIds || [];

        return list.includes(currentUser?.id);
    }, [currentUser?.id, fetchedPost?.likedIds]);


    const toggleLike = useCallback(async () => {
        if(!currentUser) {
            return loginModal.onOpen();
        }
        try{
            let request;
            if (hasLiked){
                request = () => axios.delete("/api/like", { data: { postId }});
            }
            else{
                request = () => axios.post("/api/like", { postId });
            }

            await request();
            mutateFetchedPost();
            mutateFetchedPosts();

            toast.success("Successfully liked.");

        }catch(error){
            toast.error("Something went wrong.");
        }
    }, [currentUser, hasLiked, postId, mutateFetchedPost, mutateFetchedPosts, loginModal]);

    return{
        hasLiked, 
        toggleLike
    };
}

export default useLike;
