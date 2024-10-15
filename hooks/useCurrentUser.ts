"use client";
import useSWR from "swr";
import fetcher from "@/libs/fetcher";

//data ya bakacak, ihtiyaç duyarsa tekrar çekecek.
const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSWR('api/current', fetcher);

    return { data, error, isLoading, mutate };
}

export default useCurrentUser;