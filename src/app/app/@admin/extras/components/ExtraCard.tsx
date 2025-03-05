"use client";
import React from "react";
import {User} from "@prisma/client";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import {fr} from "date-fns/locale";
import {useModalContext} from "@/contexts/ModalContext";
import {BaseModal} from "@/components/modals/BaseModal";
import {ExtraDetails} from "@/app/app/@admin/extras/components/ExtraDetails";
import {UserType} from "@/types/Datatype";

export function ExtraCard({extra}: {extra:UserType|null}): JSX.Element {
    const { openModal, closeModal } = useModalContext();
    // Convert date created to period of time with date-fns
    const date = new Date(extra?.createdAt!);
    const period = formatDistanceToNow(date, { addSuffix: true, locale: fr });

    function handleOpenModal() {
        openModal(
            <BaseModal
                content={<ExtraDetails  extra={extra}/>}
                closeModal={closeModal}
                header={"Détails de l'extra"}
                type={"primary"}
                width={1095}
            />
        )
    }

    return (
        <div className={"flex flex-row gap-4 shadow-normal rounded-[20px] bg-white py-[12px] px-5"}>
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
            <div className="flex flex-col justify-between items-start gap-2">
               <div className="w-full">
                   <h5 className="w-[200px] text-[22px] text-[#000] font-normal leading-normal truncate">
                       {extra?.firstName} {extra?.lastName}
                   </h5>
                   <p className={"leading-0"}>
                       Rajouté {period}
                   </p>
               </div>
                <div className="flex flex-row justify-between gap-4 w-full">
                    <button
                        onClick={handleOpenModal}
                        className="bg-secondary w-full rounded-[20px] px-[20px] py-[5px] text-white text-[12px] font-normal leading-normal hover:bg-primary transition duration-200 ease-in-out"
                    >
                        Détails
                    </button>
                </div>
            </div>
        </div>
    )
}
