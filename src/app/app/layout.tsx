import "@/app/globals.css";
import React, {Suspense} from "react";
import {ModalProvider} from "@/contexts/ModalContext";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import ExtraHeader from "@/components/ExtraLayoutComponent/ExtraHeader";
import ExtraSideBar from "@/components/ExtraLayoutComponent/ExtraSideBar";
import {redirect} from "next/navigation";
import Loading from "./loading";
import moment from "moment/moment";

export const metadata = {
    title: "Mon espace | Vquarius Agency",
    description: "",
};

interface Props {
    hotel: React.ReactNode;
    extra: React.ReactNode;
    admin: React.ReactNode;
}


export default async function HotelLayout({
                                              hotel,
                                              admin,
                                              extra,
                                          }: Props) {

    const session = await getServerSession(authOptions);
    if (!!!session || !!!session?.user) {
        // redirect to /
        redirect('/connexion');
        return <></>;
    }

    const component = session?.user?.role === 'HOTEL' ? hotel : session?.user?.role === 'ADMIN' ? admin : extra;
    return (
        <ModalProvider>
            <div className={"flex h-full"}>
                <ExtraSideBar user={session.user}/>
                <div className={"flex-1 overflow-hidden flex flex-col h-full"}>
                    <ExtraHeader user={session.user}/>
                    <div className={'lg:ml-[377px] h-full pt-[100px]  overflow-x-hidden overflow-y-scroll'}>
                        <div className={'container'}>
                            <Suspense fallback={<Loading/>}>
                                {component}
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </ModalProvider>
    );
}
