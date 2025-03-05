'use client'

import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";


interface Props {
    user: User;
}

const ExtraHeader = ({ user }: Props) => {
    const rightComponent = user.role === 'HOTEL' ? 
        <span>Bienvenue</span> : 
        <>
            <span>Bonjour</span>
            <span className="ml-1 font-bold ">{`${user.firstName ?? ""}`}</span>
        </>;

    return (
        <header className={'bg-white h-[80px] fixed top-0 left-0 right-0 z-30 flex items-center'}>
            <div className={'w-full h-full flex justify-between items-center sm:pl-4'}>
                <div className={'flex md:flex-1'}>
                    <Link href={'/app'} className={'cursor-pointer'}>
                        <Image src={'/logo_header.png'} width={0} height={0} className={'h-[56px] w-[150px]  md:w-auto'} alt={''}
                               sizes={'100vw'}/>
                    </Link>
                </div>
                <div className={'bg-secondary md:w-[543px] flex items-center  overflow-hidden h-full pr-4 md:min-w-max'}
                >
                    <div
                        className={"w-20 hidden md:block h-full relative after:content-[''] after:absolute after:rotate-[35deg] after:w-[300px] after:h-[300px] after:bottom-0 after:right-2 after:bg-white"}
                    />
                    <div className="flex items-center ml-2 md:ml-36 ">
                        <div className=" flex items-center text-white text-xl pr-2 md:pr-8 ">
                            {rightComponent}
                        </div>
                        <div style={{background: `url('${user.image}') no-repeat top/cover`}} className={` h-[30px] w-[30px] md:h-[54px] md:w-[54px] rounded-full m-auto`}/>
                        {/* //Todo add this in a popover when we click on this component */}
                        <div className="flex items-center ml-2 md:ml-8">
                            <button onClick={() => signOut({redirect: true, callbackUrl: "/"})} className={'cursor-pointer'}>
                                <Image src={'/logout.svg'} width={0} height={0} className={'h-[24px] w-auto'} alt={''}
                                        sizes={'100vw'}/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default ExtraHeader;