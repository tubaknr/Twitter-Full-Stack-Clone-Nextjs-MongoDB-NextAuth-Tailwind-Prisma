"use client";
import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";

//data ya bakacak, ihtiyaç duyarsa tekrar çekecek.
const usePost = (postId: string) => {
    // console.log("usePOST POSTID:", postId); //CORRECT

    const { data, error, isLoading, mutate } = useSWR(postId ? `/api/posts/${postId}` : null, fetcher);

    return { data, error, isLoading, mutate };
}

export default usePost;
