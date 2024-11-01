"use client";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

//data ya bakacak, ihtiyaç duyarsa tekrar çekecek.
const useUsers = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/users', fetcher);

    return { data, error, isLoading, mutate };
}

export default useUsers;