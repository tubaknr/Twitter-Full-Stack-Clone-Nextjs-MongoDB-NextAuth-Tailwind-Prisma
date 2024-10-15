"use client"
import Header from "@/components/Header";
import useUser from "@/hooks/useUser";
import { ClipLoader } from "react-spinners";
import UserHero from "@/components/users/UserHero";
import { useParams } from 'next/navigation';
import UserBio from "@/components/users/UserBio";
import PostFeed from "@/components/posts/PostFeed";


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
            <UserBio userId={userId as string}/>
            {/* <p className="text-white">{userId}</p> */}
            <PostFeed userId={userId as string} />

        </div>
    )
}



export default UserView;

