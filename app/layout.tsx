import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import FollowBar from "@/components/FollowBar";
import Modal from "@/components/Modal";


export const metadata: Metadata = {
  title: "Twitter",
  description: "Twitter",
};

interface LayoutProps{
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    const isAuthenticated = false;

return(
  <html lang="en">
    <body>

      {!isAuthenticated && <Modal isOpen title="Test Modal" actionLabel="Submit"/>}

      {isAuthenticated && 
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
       </div>}


      </body>
    </html>
  );
}    

export default Layout;