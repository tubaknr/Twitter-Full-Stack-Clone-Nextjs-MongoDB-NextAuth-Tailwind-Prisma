"use client";

import type { Metadata } from "next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import "./globals.css";
import Sidebar from "@/app/components/Sidebar";
import FollowBar from "@/app/components/FollowBar";
import LoginModal from "@/app/components/modals/LoginModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import RegisterModal from "@/app/components/modals/RegisterModal";
import { Toaster } from "react-hot-toast";
import { SessionProvider, useSession } from "next-auth/react";
import EditModal from "@/app/components/modals/EditModal";


interface LayoutProps{
  children: React.ReactNode;
  session: any;
}

interface LayoutContentProps{
  children: React.ReactNode;
}

const LayoutContent:React.FC<LayoutContentProps> = ({ children }) => {

    const { data: sessionData, status } = useSession();

    // console.log("sessionData:",sessionData);

    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    // if(status == "loading"){
    //   console.log("LOADING app/LAYOUT.TSX");
    // }

    return(
    <>
  
        <Toaster />
      
          {status === "unauthenticated" && registerModal.isOpen && <RegisterModal />}
          {status === "unauthenticated" && loginModal.isOpen && <LoginModal />}
          
          {(
            
            <>
          <EditModal />
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
          </>
          )}
        
         
      </>
  
  );
}    

const Layout: React.FC<LayoutProps> = ({children, session}) => {

  return(
    <html lang="en">
      <body>
      
        <SessionProvider session={session}>
            <LayoutContent>
                {children}
            </LayoutContent>
        </SessionProvider>
          
          </body>
        </html>
  )

}


export default Layout;
