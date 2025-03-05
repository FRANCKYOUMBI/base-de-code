import React from "react";
import { getFormations } from "@/services/getData";
import Link from 'next/link'

export default async function Formation() {
    const Formations = await getFormations();
    return (
        <main className='hotel_container pb-14'>
            <div className={'container mx-auto relative mb-[72px] md:mb-[172px]'}>
                <div className="pl-5 lg:pl-0 ">
                    <div
                        className={"bg-[url('/hotel.png')] rounded-[20px] w-full h-[334px] flex items-center overflow-hidden"}>
                        <div className={'w-[27%] hidden md:block'}>
                        </div>
                        <div className={'flex-1 flex w-full h-full justify-end'}>
                            <div
                                className={" relative flex items-center justify-center h-full w-full md:w-[57%] bg-secondary/90 rounded-tl-[20px] before:content-[''] before:absolute before:rotate-[33deg] before:w-[180px] before:h-[131%] before:hidden md:before:block before:top-[-60px] before:left-[-35px] before:-translate-x-[37%] before:translate-y-[25px] before:bg-secondary/90 before:rounded-[20px]"}>
                                <div className=" text-white z-10 m-5">
                                    <h2 className=" font-bold lg:text-2xl">Pourquoi suivre ces formations ?</h2>
                                    <p className="mt-4 sm:text-sm lg:text-lg" >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa sed elementum tempus egestas sed sed risus pretium. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute bg-[url('/youtube_logo_giant.jpg')] top-[94px] left-[44px]  md:h-[314px] md:w-[355px] lg:h-[200px] h-[200px] hidden md:block lg:w-[237px] w-[237px] xl:h-[350px] xl:w-[438px] bg-cover bg-no-repeat bg-[position:center] rounded-[20px] "
                    >
                        <div className=" absolute bottom-[10px] left-[10px] bg-[url('/play.png')] h-[50px] w-[50px]" />
                    </div>
                </div>
            </div>
            <div className={'container mx-auto relative '}>
                <div className="pl-5 lg:pl-0 ">
                    <div className="grid xl:ml-[44px] md:grid-cols-2 gap-x-[30px] xl:grid-cols-3 gap-y-[30px]">
                        {Formations?.map((formations, index) => (
                            <Link href={`${formations.link}`} target="_blank">
                                <div key={index} className=" flex flex-col justify-center">
                                    <div
                                        className={"h-[200px] w-full xl:h-[250px] bg-cover bg-no-repeat bg-[position:center] rounded-[20px] relative"}
                                        style={{
                                            backgroundImage: `url(${formations?.image?.url ?? '/youtube_logo_giant.jpg'})`,
                                        }}
                                    >
                                        <div className=" absolute bottom-[10px] left-[10px] bg-[url('/play.png')] h-[50px] w-[50px]" />
                                    </div>
                                    <div className="mt-3">
                                        <p className="text-[24px] text-black font-medium">{formations.name}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}

                    </div>
                </div>
            </div>
        </main>
    )
}