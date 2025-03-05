"use client";
import { useState } from "react";
import { Fragment } from "react";
import { ExtraHistorique } from "./ExtraHistorique";
import { UserType } from "@/types/Datatype";
import {HotelHistorique} from "@/app/app/@admin/historique-missions/component/HotelHistorique";

export function MissionsHistory({ extras, hotels}: { extras: UserType[], hotels: UserType[]}) {
    const [toggleDisplay, setToggleDisplay] = useState<"extra"|"hotel">("extra");
    return(
        <Fragment>
            <div className=" flex">
                <div className={'container mx-auto'}>
                    <div
                        className={"bg-[url('/hextrabg.svg')]  rounded-[20px] h-[122px] max-w-[600px] mx-auto flex items-center overflow-hidden"}>
                        <div className={'w-[30%]'}>
                        </div>
                        <div className={'flex-1 flex w-full h-full justify-end'}>
                            <div
                                className={" relative flex items-center justify-center h-full w-9/12 bg-secondary rounded-tl-[20px] before:content-[''] before:absolute before:rotate-[35deg] before:w-[180px] before:h-[180px] before:top-[-30px] before:left-0 before:-translate-x-[37%] before:translate-y-[25px] before:bg-secondary before:rounded-[20px]"}>
                                <div className=" z-10 m-5">
                                    <h2 className="text-white text-[18px] font-semibold uppercase">Pour les extras </h2>
                                    <button onClick={() =>setToggleDisplay("extra")} className="px-[25px] rounded-[30px] mt-[16px] bg-white h-[37px] z-[2] text-[12px] sm:text-sm md:text-lg">
                                        Afficher
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'container mx-auto'}>
                    <div
                        className={"bg-[url('/hmissionbg.svg')] rounded-[20px] h-[122px] max-w-[600px] mx-auto flex items-center overflow-hidden"}>
                        <div className={'w-[30%]'}>
                        </div>
                        <div className={'flex-1 flex w-full h-full justify-end'}>
                            <div
                                className={" relative flex items-center justify-center h-full w-9/12 bg-secondary rounded-tl-[20px] before:content-[''] before:absolute before:rotate-[35deg] before:w-[180px] before:h-[180px] before:top-[-30px] before:left-0 before:-translate-x-[37%] before:translate-y-[25px] before:bg-secondary before:rounded-[20px]"}>
                                <div className="z-10 m-5">
                                    <h2 className="text-white text-[18px] font-semibold uppercase">Pour les hôtels </h2>
                                    <button onClick={() =>setToggleDisplay("hotel")} className="px-[25px] rounded-[30px] mt-[16px] bg-white h-[37px] z-[2] text-[12px] sm:text-sm md:text-lg ">
                                        Afficher
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {toggleDisplay === "extra" ? 
                <ExtraHistorique extras={extras} />:
                <HotelHistorique hotels={hotels} />
            }
        </Fragment>
    )
}