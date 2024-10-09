import useSWR from "swr";
import fetcher from "@/libs/fetcher";

//data ya bakacak, ihtiyaç duyarsa tekrar çekecek.
const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSWR('api/current', fetcher);

    if (isLoading) {
        return { data: null, error: null, isLoading: true, mutate };
    }
    if (error) {
        return { data: null, error, isLoading: false, mutate };
    }
    if (!data){
        return {data: null, error: null, isLoading: true, mutate };
    }

    return { data, error, isLoading, mutate };
}

export default useCurrentUser;