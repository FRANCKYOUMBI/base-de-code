'use client'

import Image from 'next/image';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { pathToFileURL } from 'url';

export default function AdminSideBar() {

    const menus = [
        {
            title: "Requetes",
            href: '/app/requetes'
        },
        {
            title: "Extras",
            href: '/app/extras'
        },
        {
            title: 'Hôtels',
            href: '/app/hotels'
        },
        {
            title: "Historique missions",
            href: "/app/historique-missions"
        },
        {
            title: "Facturation",
            href: "/app/facturation"
        },
        {
            title: "Offres",
            href: "/app/offres"
        },
        {
            title: "Calendrier",
            href: "/app/calendrier"
        },
        {
            title: "Rapport",
            href: "/app/rapport"
        },
    ]

    const pathname = usePathname();

    return (
        <aside className={'px-5 py-[184px] bg-primary min-w-[377px] max-w-[377px] w-[377px]'}>
            <div className='flex flex-col items-center mb-8'>
                <div style={{ background: `url('/profile-admin.png') no-repeat top/cover` }}
                    className="h-[150px] lg:h-[220px] border-solid border-[6px] border-[#B9B9B9] w-[150px] lg:w-[220px] bg-cover bg-center rounded-[100%]">
                </div>
                <div className=" flex flex-col mt-4 items-center text-white text-2xl ">
                    <span className=" font-bold ">Admin</span>
                </div>
            </div>
            <input className={"border-none rounded-[30px] outline-none pl-5 pr-5 py-3 w-full max-w-[301px]"} placeholder={'rechercher'} />
            <nav className={'text-white font-light text-xl mt-4 flex flex-col  gap-8'}>
                {menus.map((m, index) => <div key={`hotel_sidebar_menu_item_${index}`} className={'flex items-center gap-3'}>
                    <div
                        className={`transition-all duration-500 w-full ${pathname == m.href ? 'bg-white relative rounded-[30px] w-[333px] py-4  text-black font-bold' : ''}`}>
                        <Link href={m.href}
                            className={pathname == m.href ? 'cursor-default ml-[88px]' : 'cursor-pointer ml-[88px]'}>{m.title}</Link>
                        {pathname == m.href && pathname == 'requetes' ?
                            <div className=' rounded-full h-[70px] w-[70px] absolute top-[-5px] right-[-1px] bg-black text-white flex items-center justify-center'>35</div> : ""}
                    </div>
                </div>)}
            </nav>
        </aside>
    );
}