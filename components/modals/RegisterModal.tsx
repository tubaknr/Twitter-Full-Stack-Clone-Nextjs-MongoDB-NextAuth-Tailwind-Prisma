"use client"

import useLoginModal from "@/hooks/useLoginModal";
import Input from "@/components/Input";
import { useCallback, useState } from "react";
import Modal from "@/components/Modal";
import useRegisterModal from "@/hooks/useRegister";

const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    
    const onSubmit = useCallback(async () => {
        try{
            setIsLoading(true);
            
            //TODO ADD REGISTER AND LOG IN

            registerModal.onClose();

        }catch(error){
            console.log(error);

        }finally{
            setIsLoading(false);
        }

    }, [registerModal]);


    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input 
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                disabled={isLoading}
            />
            <Input 
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />

            <Input 
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                disabled={isLoading}
            />
            <Input 
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={isLoading}
            />
        </div>
    )


    return(
        <Modal 
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Create an account"
            actionLabel="Register"
            onClose={registerModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    );
} 

export default RegisterModal;
