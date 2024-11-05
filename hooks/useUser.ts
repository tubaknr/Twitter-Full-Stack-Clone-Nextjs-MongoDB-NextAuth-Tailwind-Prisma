"use client";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

//data ya bakacak, ihtiyaç duyarsa tekrar çekecek.
const useUser = (userId: string) => {
    // console.log("USERID USEUSER.TS: ", userId);//CORRECT
    // console.log("useUser user ID:", userId);
    const url = userId ? `/api/users?userId=` + userId : null;
    const { data, error, isLoading, mutate } = useSWR(url, fetcher);
    
    const targetId = userId;
    // console.log("TYPE:" , typeof(data)); //object
    if(typeof(data) === "object"){
        for(let i=0; i<6; i++){
            if(data[i].id === targetId){
                // console.log("FOUND!", data[i].id);
                return { data: data[i], error, isLoading, mutate };
            }
        }
    }
    return { data: null, error, isLoading, mutate};
}

export default useUser;
