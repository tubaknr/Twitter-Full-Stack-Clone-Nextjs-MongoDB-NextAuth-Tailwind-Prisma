"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";
import usePosts from "@/hooks/usePosts";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "./Button";
import Avatar from "./Avatar";
import usePost from "@/hooks/usePost";


interface FormProps{
    isComment?: string;
    placeholder: string;
    postId?: string;
}

const Form: React.FC<FormProps> = ({ isComment, placeholder, postId }) => {
    
    const registerModel = RegisterModal();
    const loginModal = LoginModal();

    const { data: currentUser } = useCurrentUser();
    const { mutate: mutatePosts } = usePosts(); 
    const { mutate: mutatePost } = usePost(postId as string);

    const [body, setBody] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    

    const onSubmit = useCallback(async () => {
        try{
            setIsLoading(true);

            // comment ise api/comments/ de bor comment oluştur. değilse normal post olarak yayınla.
            const url = isComment ? "/api/comments?postId=" + postId : "api/posts";
        
            const resp = await axios.post(url, {body});
            console.log("RESP COMMENT-POST FORM.TSX! :  ",resp);

            toast.success("Tweet created successfully.");

            setBody('');
            mutatePosts();
            mutatePost();

        }catch(error){
            toast.error("Something went wrong.");

        }finally{
            setIsLoading(false);
        }
    }, [body, mutatePosts, mutatePost]);



    return(
        <>
        <div className="border-b-[1px] border-neutral-800 px-5 py-2">
            {currentUser ? (
                <div className="flex flex-row gap-4 mt-2">
                    <div>
                        <Avatar userId={currentUser?.userId} />

                    </div>
                    <div className="w-full">
                        <textarea 
                            disabled={isLoading}
                            onChange={(e) => setBody(e.target.value)}
                            value={body}
                            className="
                                disabled:opacity-80
                                peer
                                resize-none
                                mt-3
                                w-full
                                bg-black
                                ring-0
                                outline-none
                                text-[20px]
                                placeholder-neutral-500
                                text-white"
                            placeholder={placeholder}
                            >

                        </textarea>

                            <hr className="
                                opacity-0
                                peer-focus:opacity-100
                                h-[1px]
                                w-full
                                border-neutral-800
                                transition"
                            />
                            
                            <div className="mt-4 mb-2 flex flex-row justify-end">
                                <Button 
                                    disabled={isLoading || !body}
                                    onClick={onSubmit}
                                    label="Tweet"
                                />
                            </div>



                    </div>
                </div>
            ) : (

            <div className="py-8">
                <h1 className="text-white text-2xl text-center mb-4 font-bold"> 
                    Welcome to Plitter
                </h1>
                <div className="flex flex-row items-center justify-center gap-4">   
                    <Button label="Login" onClick={loginModal.onOpen}/>
                    <Button label="Register" onClick={registerModel.onOpen} secondary/>
                </div>
            </div>
            )}
        </div>
        </>
    )
} 

export default Form;
