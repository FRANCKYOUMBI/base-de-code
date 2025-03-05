'use client'

import Image from 'next/image';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function HotelSideBar() {

    const menus = [
        {
            title: "Nouvelle requête",
            href: '/app/nouvelle-requete'
        },
        {
            title: 'historique missions',
            href: '/app/historique-missions'
        },
        {
            title: "Profil Hôtel",
            href: "/app/profile"
        }
    ]

    const pathname = usePathname();

    return (
        <aside className={'px-5 bg-primary min-w-[300px] max-w-[300px] w-[300px]'}>
            <Image
                draggable={false}
                alt={'logo_white'}
                src={'/logo_white.png'}
                width={262}
                height={245}
                className={'mx-auto'}
            />
            <nav className={'text-white font-light mt-20 text-xl flex flex-col gap-10'}>
                {menus.map((m, index) => <div key={`hotel_sidebar_menu_item_${index}`} className={'flex items-center gap-3'}>
                    <div
                        className={`transition-all duration-500 w-full ${pathname == m.href ? 'bg-white p-4 text-primary font-bold' : ''}`}>
                        <Link href={m.href}
                            className={pathname == m.href ? 'cursor-default' : 'cursor-pointer'}>{m.title}</Link>
                    </div>
                    {pathname == m.href ? <motion.div layoutId={'hotel_side_bar_menu_arrow_icon'}>
                        <Image draggable={false} src={'right_arrow.svg'} alt={''} width={18} height={36}
                            className={`transition-all duration-200`} />
                    </motion.div> : <div className={'w-[18px]'} />}
                </div>)}
            </nav>
        </aside>
    );
}