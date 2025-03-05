'use client'

import Link from "next/link";
import {usePathname} from "next/navigation";
import {extraMenus, hotelMenus, adminMenus, Menu} from "@/data/menus";
import {User} from 'next-auth';
import {useState} from "react";

interface Props {
    user: User;
}

export default function ExtraSideBar({user}: Props) {

    // Check Role Here
    // const menus: Menu[] = hotelMenus;
    const menus: Menu[] = user.role === 'HOTEL' ? hotelMenus : user.role === 'ADMIN' ? adminMenus : extraMenus;
    const pathname = usePathname();
    const [open, setOpen] = useState<boolean>(false)

    return (
        <>
            {open && <div onClick={() => {setOpen(false)}} className={'block lg:hidden w-full absolute h-full bg-black/60 z-20'}>
            </div>}
            <aside
                className={`z-20 lg:z-auto drop-shadow-gray-600 shadow-2xl fixed bg-primary sm:min-w-[377px] sm:max-w-[377px] sm:w-[377px] h-screen ${open ? 'left-[0]' : '-left-[304px] sm:-left-[377px] lg:left-0'} transition-[left] duration-500`}>
                <div className="overflow-y-auto h-full w-full px-5 py-[120px]">
                    <div className='flex flex-col items-center mb-8'>
                        <div style={{background: `url('${user.image}') no-repeat top/cover`}}
                             className="border-solid border-[6px] border-[#B9B9B9] w-[120px] xl:w-[180px] h-[120px] xl:h-[180px] bg-cover bg-center rounded-[100%]">
                        </div>
                        <div className=" flex flex-col mt-4 items-center text-white">
                            <span className=" font-bold text-xl">{user.name}</span>
                            {!!user.identifiant && <span className='font-thin text-lg'>{user.identifiant}</span>}
                        </div>
                    </div>
                    <input
                        className={"border-none rounded-[30px] outline-none pl-5 pr-5 py-3 mb-3 w-full max-w-[301px]"}
                        placeholder={'Rechercher'}/>
                    <nav className={'text-white font-light text-[18px] mt-4 flex flex-col  gap-4'}>
                        {menus.map((m, index) =>
                            <div key={`hotel_sidebar_menu_item_${index}`} className={'flex items-center gap-3'}>
                                <div
                                    className={`transition-all duration-500 w-full ${pathname == m.href ? 'bg-white rounded-[30px] w-[333px] text-black font-bold' : ''}`}>
                                    <Link prefetch={true} href={m.href}
                                          className={`flex py-4 ml-[88px] ${pathname == m.href ? ' cursor-default ' : 'cursor-pointer'}`}>
                                        {m.title}
                                    </Link>
                                </div>
                            </div>
                        )}
                    </nav>
                </div>
                <div
                    className="block lg:hidden z-40  absolute top-[100px] -right-2 transform translate-x-full space-y-1 cursor-pointer"
                    onClick={() => {
                        setOpen(!open);
                    }}>
                    <span className="bg-black w-8 h-1 block"></span>
                    <span className="bg-black w-8 h-1 block"></span>
                    <span className="bg-black w-8 h-1 block"></span>
                </div>
            </aside>
        </>
    );
}