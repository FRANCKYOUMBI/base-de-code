'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


const AdminHeader = () => {


    return (
        <header className={'bg-white h-[100px] fixed top-0 left-0 right-0 z-30 flex items-center'}>
            <div className={'w-full h-full flex justify-between items-center pl-4'}>
                <div className={'md:flex-1'}>
                    <Link href={'/'} className={'cursor-pointer'}>
                        <Image src={'/logo_header.png'} width={0} height={0} className={'h-[56px] w-auto'} alt={''}
                            sizes={'100vw'} />
                    </Link>
                </div>
                {/* <div className={
                    "w-20 h-full bg-secondary  hidden lg:block relative after:content-[''] after:absolute after:rotate-[35deg] after:w-[300px] after:h-[300px] after:bottom-0 after:right-2 after:bg-white"
                }> */}
                <div className={'bg-secondary w-[543px] flex items-center  overflow-hidden h-full pr-4 min-w-max'}
                >
                    <div className={"w-20 h-full relative after:content-[''] after:absolute after:rotate-[35deg] after:w-[300px] after:h-[300px] after:bottom-0 after:right-2 after:bg-white"}
                    />
                    <div className="flex items-center ml-36 ">
                        <div className=" flex items-center text-white text-2xl pr-8 ">
                            <span>welcomeback Admin</span>
                        </div>
                        <div style={{ background: `url('/profile-admin.png') no-repeat top/cover` }} className={`h-[85px] w-[85px] rounded-full m-auto`} />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default AdminHeader;