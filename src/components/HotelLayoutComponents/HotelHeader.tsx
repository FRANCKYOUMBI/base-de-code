'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";


const HotelHeader = () => {
    const router = useRouter()

    return (
        <header className={'bg-white h-[100px] fixed top-0 left-[300px] right-0 pl-5 flex justify-between items-center z-30'}>
            {/*<div className={'h-full flex-1 flex justify-between items-center pl-4 gap-10'}>*/}
            <input onFocus={ () => router.push("/app/document")} className={"border-black border-2 pl-5 pr-5 py-3 w-full max-w-[580px] bg-[url('/search_icon.svg')] bg-no-repeat bg-[length:28px] bg-[position:center_right_10px]"} placeholder={'rechercher un document'} />
            <div className={'bg-black flex items-center overflow-hidden h-full pr-4 min-w-max'}
            >
                <div className={"w-20 h-full relative after:content-[''] after:absolute after:rotate-[35deg] after:w-[300px] after:h-[300px] after:bottom-0 after:right-2 after:bg-white"}
                />
                <div className={'px-2 gap-3 flex items-center min-w-[100px]'}>
                    <span className={'text-white text-2xl'}>Bienvenue</span>
                    <Image src={'/ibis_logo_red.png'} width={58} height={58} alt={'ibis icon'} className={'rounded-full'} />
                </div>

            </div>
            {/*</div>*/}
        </header>
    )
}

export default HotelHeader;