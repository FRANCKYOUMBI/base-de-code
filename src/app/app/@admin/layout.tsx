import '@/app/globals.css'
import React from "react";

export const metadata = {
    title: 'Mon espace Extra | Vquarius Agency',
    description: '',
}

export default async function HotelLayout({ children }: { children: React.ReactNode }) {


    return (
        <>
            {children}
        </>
    )
}
