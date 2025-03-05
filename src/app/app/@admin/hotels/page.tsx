import Link from "next/link";
import React from "react";
import { UserType } from "@/types/Datatype";
import { getUsersByRole } from "@/services/users";
import { ListHotels } from "./components/ListHotels";

export default async function HotelPage() {
    const hotels = await getUsersByRole("HOTEL") as unknown as UserType[];

    return (
        <div className={'flex flex-col relative'}>
            <div className={'bg-black rounded-[20px] md:h-[334px] w-full  mx-auto flex flex-col md:flex-row items-center overflow-hidden'}>
                <div className={' relative flex md:pl-[55px]'}>
                    <div
                        className={"bg-[url('/hotel-admin.svg')] h-[250px] w-[250px] bg-no-repeat"}></div>
                    <div className="absolute h-[100px] w-[100px] md:h-[120px] md:w-[120px] right-0 top-5 md:right-[-70px] md:top-[-20px] rounded-full bg-white flex items-center justify-center font-bold text-5xl">
                        {hotels?.length}
                    </div>
                </div>
                <div className={'flex-1 flex w-full h-full justify-end'}>
                    <div
                        className={" relative flex items-center justify-center h-full w-full md:w-[57%] bg-secondary rounded-tl-[20px] before:content-[''] before:absolute before:rotate-[33deg] before:w-[180px] before:h-[131%] before:hidden md:before:block before:top-[-60px] before:left-[-35px] before:-translate-x-[37%] before:translate-y-[25px] before:bg-secondary before:rounded-[20px]"}>
                        <div className=" text-white z-10 m-5">
                            <Link href="/contact" className="button-rounded bg-white text-black text-center z-[2] text-[12px] sm:text-sm md:text-lg font-bold block">
                                Hotels
                            </Link>
                            <p className="mt-4 text-lg text-center" >Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore. </p>
                        </div>
                    </div>
                </div>
            </div>
            <hr className=" bg-black my-6" />
            <ListHotels hotels={hotels} />
        </div>
    )
}