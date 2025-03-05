import '@/app/globals.css'
import React from "react";
import Header from "@/components/VitrineLayoutComponents/Header";
import {notFound} from "next/navigation";
import Footer from "@/components/VitrineLayoutComponents/Footer";
import HotelHeader from "@/components/HotelLayoutComponents/HotelHeader";
import HotelSideBar from "@/components/HotelLayoutComponents/HotelSideBar";
import {ModalProvider} from '@/contexts/ModalContext';


export const metadata = {
    title: 'Mon espace Hôtel | Vquarius Agency',
    description: '',
}



export default async function HotelLayout({children}: { children: React.ReactNode }) {

    return (
        <>
            {children}
        </>
    )
}
