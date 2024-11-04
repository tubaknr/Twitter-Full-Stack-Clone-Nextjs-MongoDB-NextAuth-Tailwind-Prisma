import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

// protect the page
export async function getServerSideProps(context:NextPageContext) {
    const session = await getSession(context);

    if(!session){
        return{
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
    return{
        props: {
            session
        }
    }
}


const Notifications = () => {

    return(
        <div>
            <Header label="Notifications" showBackArrow/>
            <NotificationsFeed />
        </div>

    )
}

export default Notifications;



