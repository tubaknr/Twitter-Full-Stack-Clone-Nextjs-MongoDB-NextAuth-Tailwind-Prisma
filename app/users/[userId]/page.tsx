"use client"
import Header from "@/components/Header";
import useUser from "@/hooks/useUser";
import { ClipLoader } from "react-spinners";
import UserHero from "@/components/users/UserHero";
import { useParams } from 'next/navigation';


const UserView = ()  => {

    const { userId } = useParams();
    // console.log("userId:",userId);
    const { data: fetchedUser, isLoading } = useUser(userId as string);

    if (isLoading || !fetchedUser){
        return(
            <div 
                className="
                    flex 
                    justify-center
                    items-center
                    h-full">
                <ClipLoader color="lightblue" size={80}/>
            </div>
        )
    }

    return(
        <div>

            <Header showBackArrow label="User Profile"/>
            <UserHero userId={userId as string} />

        </div>
    )
}



export default UserView;

