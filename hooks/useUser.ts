"use client";
import useSWR from "swr";
import fetcher from "@/libs/fetcher";

//data ya bakacak, ihtiyaç duyarsa tekrar çekecek.
const useUser = (userId: string) => {
    const { 
        data, 
        error, 
        isLoading, 
        mutate 
    } = useSWR(userId ? `/api/users/${userId}` : null, fetcher);

    return { data, error, isLoading, mutate };
}

export default useUser;