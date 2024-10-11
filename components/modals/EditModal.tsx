import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";



const EditModal = () => {

    const { data: currentUser } = useCurrentUser();
    
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
    
    const editModal = useEditModal();

    const [profileImage, setProfileImage] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    

    useEffect(() => {
        setProfileImage(currentUser?.profileImage);
        setCoverImage(currentUser?.coverImage);
        setName(currentUser?.name);
        setUsername(currentUser?.username);
        setBio(currentUser?.bio);
    }, [currentUser?.profileImage, 
        currentUser?.coverImage,
        currentUser?.name,
        currentUser?.username,
        currentUser?.bio]
    );


    
    const [ isLoading, setIsLoading ] = useState(false);


    const onSubmit = useCallback(async () => {
        try{
            setIsLoading(true);
            
            await axios.patch("/api/edit", {
                profileImage,
                coverImage,
                name,
                username,
                bio
            });
            mutateFetchedUser();
            toast.success("User successfully updated.");
            editModal.onClose();

        }catch(error){
            toast.error("Something went wrong.");

        }finally{
            setIsLoading(false);
        }
    }, 
    [profileImage, coverImage, name, username, bio]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input 
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}                
            />
            <Input 
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}                
            />
            <Input 
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                disabled={isLoading}                
            />

            

        </div>
    )

    return(
        <Modal 
            disabled={isLoading}
            isOpen={editModal.isOpen}
            title="Edit your profile"
            actionLabel="Save"
            onClose={editModal.onClose}
            onSubmit={onSubmit} 
            body={bodyContent}
            />

    );
}

export default EditModal;
