import { useCallback } from "react";
import { IconType } from "react-icons";
import { useRouter } from "next/navigation";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegister";

interface SidebarItemProps{
    label?: string;
    href?: string;
    icon?: IconType;
    onClick?: () => void;
    auth?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({label, href, icon:Icon, onClick, auth}) => {

    const { data: currentUser } = useCurrentUser();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const router = useRouter();

    const handleClick = useCallback(() => {
        if(onClick){
            return onClick();
        }
        if (auth && !currentUser){ //if this route is protected and user is log out;
            loginModal.onOpen();
            registerModal.onClose();
        }
        else if(href){ //tıkladığı sayfaya git
            router.push(href);
        }
    }, [router, href, onClick, currentUser, auth, loginModal]);

    return(
        <div onClick={handleClick} 
            className="flex flex-row items-center">
            
            <div className="
                relative 
                rounded-full 
                h-14 
                w-14 
                flex 
                items-center 
                jusitfy-center 
                p-4 
                hover:bg-slate-300 
                hover:bg-opacity-10 
                cursor-pointer 
                lg:hidden">
                    <Icon size={28} className="text-white"/>
            </div>

            <div className="
                relative 
                hidden
                lg:flex
                items-center
                gap-4
                p-4
                rounded-full
                hover:bg-slate-300
                hover:bg-opacity-10
                cursor-pointer">
                    <Icon size={28} className="text-white"/>
                    
                    <p className="
                        hidden
                        lg:block
                        text-white
                        text-xl">
                        {label}
                    </p>
            </div>
        </div>
    )
}

export default SidebarItem;
