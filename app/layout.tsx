"use client";

import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import FollowBar from "@/components/FollowBar";
import LoginModal from "@/components/modals/LoginModal";
import { useEffect, useReducer, useState } from "react";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegister";
import RegisterModal from "@/components/modals/RegisterModal";

// export const metadata: Metadata = {
//   title: "Twitter",
//   description: "Twitter",
// };

interface LayoutProps{
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    // console.log("isopen:", loginModal.isOpen);
    
    
    // useEffect(() => {
    //   if(!loginModal.isOpen){ //giriş login kısmı görünmüyorsa
    //     setIsAuthenticated(true); //authenticated. giriş yapıldı.
    //   }
    // }, [loginModal.isOpen]);
    

    // useEffect(() => {
    //   if(!registerModal.isOpen){ //giriş login kısmı görünmüyorsa
    //     setIsRegistered(true); //authenticated. giriş yapıldı.
    //   }
    // }, [registerModal.isOpen]);


    // console.log("isAuthenticated:", isAuthenticated);

return(
  <html lang="en">
    <body>
      
       <RegisterModal />

       <LoginModal />

      
       <div className="h-screen bg-black">
        <div className="container h-full mx-auto xl:px-30 max-w-6xl">
          <div className="grid grid-cols-4 h-full">
            
            <Sidebar/>
            
            <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
                {children}
            </div>

            <FollowBar />

          </div>
        </div>
       </div>
      

      </body>
    </html>
  );
}    

export default Layout;