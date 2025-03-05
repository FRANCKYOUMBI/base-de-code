"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
import { User } from "@prisma/client";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { useModalContext } from "@/contexts/ModalContext";
import { BaseModal } from "@/components/modals/BaseModal";
import { RapportDetails } from "@/components/Admin/RapportDetails";
import { UserType } from "@/types/Datatype";


interface Props {
    extra?: UserType,
    setCurrentUSer?: Dispatch<SetStateAction<UserType | undefined>>
}


export function ExtraRapport({ extra, setCurrentUSer }: Props): JSX.Element {
    const { openModal, closeModal } = useModalContext();
    // Convert date created to period of time with date-fns
    // const date = new Date(extra?.createAt!);
    // const period = formatDistanceToNow(date, { addSuffix: true, locale: fr });

    function handleOpenModal() {
        openModal(
            <BaseModal
                content={<RapportDetails extra={extra} />}
                closeModal={closeModal}
                header={"Détails de l'extra"}
                type={"primary"}
                width={1095}
            />
        )
    }

    return (
        <div>
            <div className={"flex flex-row gap-4 shadow-normal rounded-[20px] bg-white py-[12px] px-5"}>
                <div className="">
                    {/* <Image
                        src="/extra-profil.png"
                        alt={"Extra profile"}
                        width={100}
                        height={105}
                        className={"rounded-full"}
                    /> */}
                    <div
                        className={"sm:w-[100px] sm:h-[100px] h-[80px] w-[80px] rounded-full bg-cover bg-center"}
                        style={{
                            backgroundImage: `url(${extra?.avatar?.url ?? '/default-profile-icon.jpg'})`,
                        }}
                    />
                </div>
                <div className="flex w-full flex-col justify-between items-start gap-2">
                    <div className="w-[150px] lg:w-[180px]">
                        <h5 className="text-[18px] sm:text-[22px] text-[#000] font-normal leading-normal truncate">
                            {extra?.firstName} {extra?.lastName}
                        </h5>
                        <p className={"leading-0"}>
                            {/* Rajouté {period} */}
                        </p>
                    </div>
                    <div className="flex flex-row justify-between w-full">
                        <button
                            onClick={() => { setCurrentUSer?.(extra) }}
                            className="bg-secondary rounded-[20px] px-[10px] sm:px-[20px] py-[5px] text-white text-[12px] font-normal leading-normal"
                        >
                            Détails
                        </button>
                        <button className="bg-black rounded-[20px] px-[10px] sm:px-[20px] py-[5px] text-white text-[12px] font-normal leading-normal">
                            Attribuer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}