"use client";
import React, { useState } from "react";
import { useModalContext } from "@/contexts/ModalContext";
import { UserType } from "@/types/Datatype";
import { ExtraDetails } from "./ExtraDetails";
import {formatDistanceToNow} from "date-fns";
import {fr} from "date-fns/locale";


interface Props {
    extras?: UserType[],
}

export function ExtraHistorique({ extras }: Props): JSX.Element {
    const [
        selectedExtra,
        setSelectedExtra
    ] = useState<UserType | undefined>(extras?.[0]);
    const { openModal, closeModal } = useModalContext();
    // Use date-fns to determine the period.
    function getPeriod(date: Date|string): string {
        const newDate = new Date(date!);
        return formatDistanceToNow(newDate, { addSuffix: true, locale: fr });
    }
    return (
        <div className="flex w-full justify-start items-start gap-5 mt-5">
            <div className="w-[65%]">
                <ExtraDetails
                    extra={selectedExtra}
                />
            </div>
            <div className="w-[45%] flex flex-col gap-5">
                {extras?.map((extra) => (
                    <div className={"flex shadow-normal w-full rounded-[20px] bg-white py-[12px] px-5"}>
                        <div className="">
                            <div
                                className={"rounded-full bg-cover bg-center"}
                                style={{
                                    width: 100,
                                    height: 100,
                                    backgroundImage: `url(${extra?.avatar?.url ?? '/default-profile-icon.jpg'})`,
                                }}
                            />
                        </div>
                    <div className="flex flex-col w-full ml-3 items-start gap-2">
                        <div className=" w-full">
                            <h5 className="w-[200px] text-[22px] text-[#000] font-normal leading-normal truncate">
                                {extra?.firstName} {extra?.lastName}
                                {extra === undefined && ("Jovany Amstrong")}
                            </h5>
                            <p className={"leading-0"}>
                                 Rajouté {getPeriod(extra?.createdAt!)}
                            </p>
                        </div>
                        <div className="flex flex-row justify-between items-center gap-4 w-full">
                            <button
                                onClick={() => setSelectedExtra(extra)}
                                className="bg-secondary rounded-[20px] h-[30px] px-[20px] py-[5px] text-white text-[12px] font-normal leading-normal"
                            >
                                Détails
                            </button>
                            <div className=" rounded-full h-[55px] flex items-center justify-center text-white text-[25px] bg-violet w-[55px]">
                                {extra?.missionsAccepted?.length}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    )
}