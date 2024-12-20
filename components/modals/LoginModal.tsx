"use client"
import { signIn } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";
import Input from "@/components/Input";
import { useCallback, useState } from "react";
import Modal from "@/components/Modal";
import useRegisterModal from "@/hooks/useRegisterModal";

const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    

    const onToggle = useCallback(() => {
        if(isLoading){
            return;
        }

        loginModal.onClose();
        registerModal.onOpen();
    }, [registerModal, loginModal, isLoading]);
    
    
    const onSubmit = useCallback(async () => {
        try{
            setIsLoading(true);

            console.log("LOGINMODAL 111111111");

            await signIn('credentials', {email, password});

            console.log("LOGINMODAL 22222222");

            loginModal.onClose();

        }catch(error){
            console.log("LOGIN MODAL SIGN IN ERROR: ", error);

        }finally{
            setIsLoading(false);
        }

    }, [loginModal, email, password]);


    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input 
                placeholder="Email"
                onChange={(e: any) => {setEmail(e.target.value)}}
                value={email}
                disabled={isLoading}
            />
            <Input 
                placeholder="Password"
                type="password"
                onChange={(e: any) => {setPassword(e.target.value)}}
                value={password}
                disabled={isLoading}
            />
        </div>
    )


    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>
                First time using Twitter? &nbsp;  
                <span onClick={onToggle}
                      className="text-white cursor-pointer hover:underline">
                      Create an account 
                </span>
            </p>
        </div>
    )


    return(
        <>
        <Modal 
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Sign in" 
            onClose={loginModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
        />
        </>

    );
} 

export default LoginModal;
