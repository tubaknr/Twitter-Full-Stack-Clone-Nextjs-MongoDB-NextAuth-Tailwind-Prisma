import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import axios from "axios";
import toast from "react-hot-toast";

// CLIENT SIDE HOOK
const useFollow = (userId: string) => {

    // currentUser = currently logged-in user's data
    // useUser =  fetch the user you're trying to follow or unfollow.
    const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
    // mutateCurrentUser function is used to update or re-fetch the current user's data after a follow/unfollow action.

    // useUser(userId) retrieves the data for the user you're interacting with (the one you want to follow or unfollow), identified by their userId. 
    // mutateFetchedUser is used to re-fetch this user’s data after the follow state changes.
    const { mutate: mutateFetchedUser } = useUser(userId);
    
    const loginModal = useLoginModal();

    // whether the current user is already following the user with userId.
    const isFollowing = useMemo(() => {
        const list = currentUser?.followingIds || [];

        return list.includes(userId);
    }, [userId, currentUser]);


    const toggleFollow = useCallback( async () => {
        if (!currentUser){
            // useLoginModal is used to prompt the user to log in if they attempt to follow or unfollow without being authenticated.
            return loginModal.onOpen();
        }

        try{
            let request;

            console.log("userId USEFOLLOW.TS:",userId)
            // unfollow
            if (isFollowing){
                request = () => axios.delete('/api/follow', { data: { userId }});
                console.log("REQUEST DEELTE:",request);
            }
            // follow
            else{
                request = () => axios.post('/api/follow', { userId });
                console.log("REQUEST POST:",request);
            }

            // console.log("REQ 1: USEFOLLLOW.TS: ", request);

            const response = await request();
            console.log("RESPONSE: ", response);
            console.log("REQ 2: USEFOLLLOW.TS: ", request);

            mutateCurrentUser(); //FOLLOW ETMEK İSTEYENİ GÜNCELLE
            mutateFetchedUser(); // follow EDİLEMK İSTENENİ GÜNCELLE

            toast.success("Success");


        }catch(error){
            toast.error("Something went wrong");

        }
    }, [currentUser,
        isFollowing,
        userId,
        mutateCurrentUser,
        mutateFetchedUser,
        loginModal
    ]);

    return{
        isFollowing, // boolean indicating whether the current user is following the target user.
        toggleFollow //  function to call to either follow or unfollow the target user.
    }
}

export default useFollow;