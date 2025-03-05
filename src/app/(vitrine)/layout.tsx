import React from "react";
import Header from "@/components/VitrineLayoutComponents/Header";
import Footer from "@/components/VitrineLayoutComponents/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function VitrineLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);
    return (
        <div className={'flex flex-col min-h-[100%] relative'}>
            <Header isLogged={!!session}/>
            <div className={'flex-1  pt-[100px]'}>
                {children}
            </div>
            <Footer />
        </div>
    )
}
