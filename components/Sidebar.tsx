import { FaUser} from 'react-icons/fa';
import { BsHouseFill, BsBellFill } from "react-icons/bs";
import SidebarLogo from './Sidebarlogo';
import SidebarItem from './SidebarItem';
import { BiLogOut } from 'react-icons/bi';
import SidebarTweetButton from "./SidebarTweetButton";
import useCurrentUser from '@/hooks/useCurrentUser';
import { signOut } from "next-auth/react";
import { toast } from 'react-hot-toast';  


const Sidebar = () => {
    const { data: currentUser } = useCurrentUser();
    console.log("currentUser:",{currentUser});

    const handleLogout = async () => {
        try{
            await signOut();
            toast.success("Logged out successfully.");
        }catch(error){
            toast.error("Error during logout.");
        }
    }

    const items = [
        {
            label: 'Home',
            href: '/',
            icon: BsHouseFill
        },
        {
            label: 'Notifications',
            href: '/notifications',
            icon: BsBellFill
        },
        {
            label: 'Profile',
            href: '/users/123',
            icon: FaUser
        },

    ]
    return(
        <div className='col-span-1 h-full pr-4 md:pr-6'>
            <div className='flex flex-col items-end'>
                <div className='space-y-2 lg:w-[230px]'>
                    
                    <SidebarLogo/>

                    {items.map((item) => (
                        <SidebarItem
                            key={item.href}
                            href={item.href}
                            label={item.label}
                            icon={item.icon}/>
                        ))}
                        
                        {currentUser && ( 
                        <SidebarItem 
                            onClick={handleLogout} 
                            icon={BiLogOut}
                            label='Logout'/>
                        )}

                        <SidebarTweetButton />
                </div>

            </div>    

        </div>
    );
}

export default Sidebar; 