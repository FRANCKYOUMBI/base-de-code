

import React from 'react';
import { getUsersByRole } from "@/services/users";
import { User } from "@prisma/client";
import { ExtraCard } from "@/app/app/@admin/extras/components/ExtraCard";
import { useState, useEffect } from 'react';
import Link from "next/link";
import { UserType } from '@/types/Datatype';
import prisma from '@/services/prisma';
import RapportComponent from '@/components/Admin/RapportLayout';
export default async function RapportPage() {
    // const extras: UserType[] = await prisma.user.findMany({
    //     where: {
    //         role: 'EXTRA'
    //     },
    //     include:{
    //         reviews:{}
    //     }
    // });
    // const extras:UserType[] = extra?.map((extra:) =>(extra))
    const extras: UserType[] | null = await getUsersByRole("EXTRA");
    return (
        <main className='hotel_container pb-14'>
             <div className={'container mx-auto'}>
            <div className="pl-5 lg:pl-0 flex flex-col relative">
                <div className={'bg-black rounded-[20px] md:h-[334px] w-full  mx-auto flex flex-col md:flex-row items-center overflow-hidden'}>
                    <div className={' relative flex md:pl-[55px] w-[30%]'}></div>
                    <div className={'flex-1 flex w-full h-full justify-end'}>
                        <div
                            className={" relative flex items-center justify-center h-full w-full md:w-[57%] bg-secondary rounded-tl-[20px] before:content-[''] before:absolute before:rotate-[33deg] before:w-[180px] before:h-[131%] before:hidden md:before:block before:top-[-60px] before:left-[-35px] before:-translate-x-[37%] before:translate-y-[25px] before:bg-secondary before:rounded-[20px]"}>
                            <div className=" text-white z-10 m-5">
                                <Link href="/contact" className="button-rounded bg-white text-black text-center z-[2] text-[12px] sm:text-sm md:text-lg font-bold block">
                                    Rapports
                                </Link>
                                <p className="mt-4 text-lg text-center" >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore. </p>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className=" bg-black my-6" />
                <RapportComponent extras={extras} />
            </div>
            </div>
        </main>
    )
}