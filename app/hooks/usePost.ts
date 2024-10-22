"use client";
import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";

//data ya bakacak, ihtiyaç duyarsa tekrar çekecek.
const usePost = (postId: string) => {
    console.log("usePOST:", postId); //!!!!
    const { data, error, isLoading, mutate } = useSWR(postId ? `/api/users/${postId}` : null, fetcher);

    return { data, error, isLoading, mutate };
}

export default usePost;
